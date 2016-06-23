import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import ArticleListPage from './containers/ArticleListPage'
import ArticleDetailPage from './containers/ArticleDetailPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ArticleListPage} />
    <Route path="article/:articleId" component={ArticleDetailPage}/>
  </Route>
)
