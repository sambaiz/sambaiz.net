import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
import ReduxThunk from 'redux-thunk'

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(api, ReduxThunk, createLogger()),
      DevTools.instrument()
    )
  )

  return store
}
