import flow from "lodash.flow"
import keyBy from "lodash.keyby"
import mapValues from "lodash.mapvalues"
import { SUCCESS as FEED_SUCCESS } from "../Feed/reducer"

export const CLEAR = "prismic/docs/CLEAR"
export const LOAD = "prismic/docs/LOAD"
export const REQUEST = "prismic/docs/REQUEST"
export const SUCCESS = "prismic/docs/SUCCESS"
export const FAILURE = "prismic/docs/FAILURE"

export const clear = () => ({ type: CLEAR })
export const load = (docType, uid = null, options = {}) => ({ type: LOAD, docType, uid, options })
export const request = (docType, uid = null) => ({ type: REQUEST, docType, uid })
export const success = (docType, uid, doc, options) => ({
  type: SUCCESS,
  docType,
  uid,
  doc,
  options
})
export const fail = (docType, uid, error) => ({ type: FAILURE, docType, uid, error })

const byId = documents => keyBy(documents, "uid")

function docs(state = {}, action) {
  switch(action.type) {
    case CLEAR:
      return {}
    case REQUEST:
    case SUCCESS:
    case FEED_SUCCESS:
    case FAILURE:
      return {
        ...state,
        [action.docType]: docs.docType(
          state[action.docType],
          action
        )
      }
    default: return state
  }
}

docs.docType = (state = {}, action) => {
  const uid = action.uid || "only"
  const data = state[uid] || {}
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        [uid]: {
          ...data,
          loading: true
        }
      }
    case SUCCESS:
      return {
        ...state,
        [uid]: {
          ...data,
          doc: action.doc,
          loading: false,
          lang: action.options.lang
        }
      }
    case FEED_SUCCESS:
      return {
        ...state,
        ...flow(
          byId,
          _ => mapValues(_, doc => ({ doc, lang: action.options.lang }))
        )(action.results)
      }
    case FAILURE:
      return {
        ...state,
        [uid]: {
          ...data,
          loading: false,
          error: action.error
        }
      }
    default: return state
  }
}

export default docs
