import { put, call, takeLatest } from "redux-saga/effects"
import * as actions from "react-prismic-redux/dist/Document/reducer"

export default function create(apiClient) {
  function * request({ docType, uid, options }) {
    yield put(actions.request(docType, uid))
    try {
      const doc = yield call(apiClient.one, docType, uid, options)
      yield put(actions.success(docType, uid, doc, options))
    } catch(error) {
      yield put(actions.fail(docType, uid, error))
    }
  }

  return function * watch() {
    yield takeLatest(actions.LOAD, request)
  }
}
