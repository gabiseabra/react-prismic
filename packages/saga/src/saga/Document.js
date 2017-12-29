import { put, fork, call, select, takeLatest } from "redux-saga/effects"
import * as actions from "react-prismic-redux/dist/Document/reducer"
import {
  getDocument,
  getDocumentLang
} from "react-prismic-redux/dist/Document/selectors"

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

  function * load({ docType, uid, options }) {
    const doc = yield select(getDocument, { type: docType, uid })
    const lang = yield select(getDocumentLang, { type: docType, uid })
    if(options.lang !== lang && options.lang !== doc.lang) {
      yield fork(request, { docType, uid, options })
    }
  }

  return function * watch() {
    yield takeLatest(actions.LOAD, load)
  }
}
