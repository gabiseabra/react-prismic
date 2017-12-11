import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import prismicSaga, { PrismicClient } from "../packages/saga/src"
import { prismicReducer } from "../packages/redux/src"

export default function create() {
  const sagaMiddleware = createSagaMiddleware()
  const reducer = combineReducers({ prismic: prismicReducer })
  const store = createStore(reducer, applyMiddleware(sagaMiddleware))
  const apiClient = new PrismicClient("example-repo")
  const saga = prismicSaga(apiClient)
  sagaMiddleware.run(saga)

  return store
}
