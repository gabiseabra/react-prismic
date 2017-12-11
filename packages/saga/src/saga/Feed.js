import { put, call, takeLatest } from "redux-saga/effects"
import * as actions from "react-prismic-redux/src/Feed/reducer"

export default function create(apiClient) {
  function * request({ docType, page, options }) {
    yield put(actions.request(docType, page))
    try {
      const collection = yield call(apiClient.all, docType, options)
      yield put(actions.success(docType, page, collection))
    } catch(error) {
      yield put(actions.fail(docType, page, error))
    }
  }

  return function * watch() {
    yield takeLatest(actions.LOAD, request)
  }
}
