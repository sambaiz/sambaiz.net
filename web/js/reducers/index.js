import { combineReducers } from 'redux'
import articleList from './articleList'
import articleDetail from './articleDetail'
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
  articleList,
  articleDetail,
  routing
})

export default rootReducer
