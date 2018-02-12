import { put, fork, call, select, takeEvery } from "redux-saga/effects"
import * as actions from "react-prismic-redux/dist/Feed/reducer"
import {
  getPageData,
  getOptions,
  isPageLoading
} from "react-prismic-redux/dist/Feed/selectors"

const sameOptions = (next, prev = {}) => {
  const diff = Object.entries(prev).find(([ key, val ]) => next[key] !== val)
  return !diff
}

export default function create(apiClient) {
  function * request({ docType, page, options }) {
    yield put(actions.request(docType, page))
    try {
      const { predicates, ...rest } = options
      const collection = yield call(apiClient.all, docType, rest, predicates)
      yield put(actions.success(docType, page, collection, options))
    } catch(error) {
      yield put(actions.fail(docType, page, error))
    }
  }

  function * load({ docType, page, options }) {
    const loading = yield select(isPageLoading, { type: docType, page })
    const data = yield select(getPageData, { type: docType, page })
    const prevOptions = yield select(getOptions, { type: docType, page })
    if(!loading && (!data.docs || !sameOptions(options, prevOptions))) {
      yield fork(request, { docType, page, options })
    }
  }

  return function * watch() {
    yield takeEvery(actions.LOAD, load)
  }
}
