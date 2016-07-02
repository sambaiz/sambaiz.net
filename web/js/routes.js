import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App.jsx'
import ArticleListPage from './containers/ArticleListPage.jsx'
import ArticleDetailPage from './containers/ArticleDetailPage.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ArticleListPage} />
    <Route path="article/:articleId" component={ArticleDetailPage}/>
  </Route>
)
