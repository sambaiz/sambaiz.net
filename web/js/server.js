'use strict'

import express from 'express'
import path from 'path'
import compression from 'compression'

require('isomorphic-fetch');

var app = express()

app.use(compression())

// serve our static stuff
app.use(express.static(path.join(__dirname, '..', '..', 'public')))

app.get('/', function (req, res) {
  res.status(200).send(page('http://sambaiz.net', 'sambaiz.net', '僕のホームページ'));
})

app.get('/article/:articleId', function (req, res) {
  fetch(`https://zx9h12n6jb.execute-api.ap-northeast-1.amazonaws.com/api/articles/${req.params.articleId}`).then(function(response){
    if (response.status == 404) {
      res.status(404).send('not found')
    }else if(response.status != 200){
      res.status(response.status).send(`API error ${response.status}`)
    }else{
      let json = response.json();
      res.status(200).send(page(`http://sambaiz.net${req.url}`, response.json().title, '書いた'));
    }
  })
})

function page(fullUrl, title, description)  {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@sambaiz">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta property="og:title" content="${title}">
        <meta property="og:type" content="blog">
        <meta property="og:image" content="http://d2wgaf7ubdj1mv.cloudfront.net/my.jpg">
        <meta property="og:url" content="${fullUrl}">
      </head>
      <body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

var PORT = process.env.PORT || 8080

app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
