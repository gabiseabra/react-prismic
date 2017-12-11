import { all, fork } from "redux-saga/effects"
import feed from "./Feed"
import document from "./Document"

export default function createSaga(options) {
  return function * watch() {
    yield all([
      fork(feed(options)),
      fork(document(options))
    ])
  }
}
