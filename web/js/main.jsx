import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore.js'
import Root from './containers/Root.jsx'
import '../css/html5reset-1.6.1.css'
import '../css/yui-min.css'
import '../css/global.css'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = configureStore(window.__INITIAL_STATE__ || {})
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('app')
)
