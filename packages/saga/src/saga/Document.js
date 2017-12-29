import { put, fork, call, select, takeEvery } from "redux-saga/effects"
import * as actions from "react-prismic-redux/dist/Document/reducer"
import {
  getDocument,
  getDocumentLang,
  isDocumentLoading
} from "react-prismic-redux/dist/Document/selectors"

export default function create(apiClient) {
  function * request({ docType, uid, options }) {
    yield put(actions.request(docType, uid))
    try {
      const doc = yield call(apiClient.one, docType, uid, options)
      console.log(doc)
      yield put(actions.success(docType, uid, doc, options))
    } catch(error) {
      yield put(actions.fail(docType, uid, error))
    }
  }

  function * load({ docType, uid, options }) {
    const loading = yield select(isDocumentLoading, { type: docType, uid })
    const doc = yield select(getDocument, { type: docType, uid })
    const lang = yield select(getDocumentLang, { type: docType, uid })
    const sameLang = (options.lang === lang || options.lang === doc.lang)
    if(!loading && (!doc || !sameLang)) {
      yield fork(request, { docType, uid, options })
    }
  }

  return function * watch() {
    yield takeEvery(actions.LOAD, load)
  }
}
