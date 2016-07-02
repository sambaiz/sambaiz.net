import { createStore, applyMiddleware } from 'redux'
import api from '../middleware/api.js'
import rootReducer from '../reducers'
import ReduxThunk from 'redux-thunk'

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(api, ReduxThunk)
  )
}
