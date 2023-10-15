import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import thunk from 'redux-thunk'
import { localStorageMiddleware, promiseMiddleware } from './middleware'
import createRootReducer, { sagas } from './reducer'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

function* rootSaga() {
  yield all(sagas)
}

// export const _history = createBrowserHistory({basename: '/'});
export const history = createHashHistory({
  hashType: 'slash',
})

export function configureStore(preloadedState) {
  const composeEnhancer = compose || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        ...[
          routerMiddleware(history),
          thunk,
          sagaMiddleware,
          promiseMiddleware,
          localStorageMiddleware,
          ...(process.env.NODE_ENV !== 'production' ? [createLogger()] : []),
        ],
      ),
    ),
  )

  // console.log(process.env)
  window._env = process.env

  // console.log(process.git);
  // console.log(NODE_ENV );

  // then run the saga
  sagaMiddleware.run(rootSaga)

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      store.replaceReducer(createRootReducer(history))
    })
  }
  return store
}

const store = configureStore()
export default store
