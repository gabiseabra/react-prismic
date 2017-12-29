import { put, fork, call, select, takeLatest } from "redux-saga/effects"
import * as actions from "react-prismic-redux/dist/Feed/reducer"
import {
  getPageData,
  getOptions
} from "react-prismic-redux/dist/Feed/selectors"

const sameOptions = (next, prev = {}) => {
  const diff = Object.entries(prev).find(([ key, val ]) => next[key] !== val)
  return !diff
}

export default function create(apiClient) {
  function * request({ docType, page, options }) {
    yield put(actions.request(docType, page))
    try {
      const collection = yield call(apiClient.all, docType, options)
      yield put(actions.success(docType, page, collection, options))
    } catch(error) {
      yield put(actions.fail(docType, page, error))
    }
  }

  function * load({ docType, page, options }) {
    const data = yield select(getPageData, { type: docType, page })
    const prevOptions = yield select(getOptions, { type: docType, page })
    if(!data.docs || !sameOptions(options, prevOptions)) {
      yield fork(request, { docType, page, options })
    }
  }

  return function * watch() {
    yield takeLatest(actions.LOAD, load)
  }
}
