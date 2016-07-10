'use strict'

import express from 'express'
import path from 'path'
import compression from 'compression'

require('isomorphic-fetch');

import { match, RouterContext } from 'react-router'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';

import routes from './routes.js'
import createStore from './store/configureStore.js'

const app = express()

app.use(compression())

// serve our static stuff
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
  render(req, res,
    (state) => state.articleList.loaded,
    (state) => '[sambaiz.net]',
    (state) => '僕のホームページ',
    (state) => `http://sambaiz.net`
)
})

app.get('/article/:articleId', (req, res) => {
  render(req, res,
    (state) => state.articleDetail.loaded && state.articleDetail.parsed,
    (state) => `${state.articleDetail.title} - [sambaiz.net]`,
    (state) => '書いた',
    (state) => `http://sambaiz.net${req.url}`
  )
})

function render(req, res, isFinishLoading, title, description, fullUrl) {

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

    let store = createStore();

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      const _render = () =>
        renderToString(<Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>)

      let unscribe = store.subscribe(() => {
        if(isFinishLoading(store.getState()) === true){
          res.status(200).send(
            page(_render(), store.getState(), title, description, fullUrl)
          )
          unscribe();
        }
      })

      _render();

    } else {
      res.status(404).send('Not found')
    }
  })
}

function page(body, state, title, description, fullUrl)  {
  return `
    <!doctype html>
    <html>
      <head>
        <title></title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="/styles.css">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@sambaiz">
        <meta name="twitter:title" content="${title(state)}">
        <meta name="twitter:description" content="${description(state)}">
        <meta property="og:title" content="${title(state)}">
        <meta property="og:type" content="blog">
        <meta property="og:image" content="http://d2wgaf7ubdj1mv.cloudfront.net/my.jpg">
        <meta property="og:url" content="${fullUrl(state)}">
        <meta name="google-site-verification" content="CEqNYjzc4Y7hb3FY7uUkmllGzeDc40brBwQJixeH61Q" />
      </head>
      <body>
        <div id="app">
          ${body}
        </div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

const PORT = process.env.PORT || 8080

app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
