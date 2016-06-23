import { createStore, applyMiddleware } from 'redux'
import api from '../middleware/api'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(api)
  )
}
