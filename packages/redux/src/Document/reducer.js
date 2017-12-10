import keyBy from "lodash.keyby"
import { SUCCESS as FEED_SUCCESS } from "../Feed/reducer"

export const CLEAR = "prismic/docs/CLEAR"
export const LOAD = "prismic/docs/LOAD"
export const REQUEST = "prismic/docs/REQUEST"
export const SUCCESS = "prismic/docs/SUCCESS"
export const FAILURE = "prismic/docs/FAILURE"

export const clear = () => ({ type: CLEAR })
export const load = (docType, uid = null, options) => ({ type: LOAD, docType, uid, options })
export const request = (docType, uid = null) => ({ type: REQUEST, docType, uid })
export const success = (docType, uid, doc) => ({ type: SUCCESS, docType, uid, doc })
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
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        [uid]: { loading: true }
      }
    case SUCCESS:
      return {
        ...state,
        [uid]: { doc: action.doc }
      }
    case FEED_SUCCESS:
      return {
        ...state,
        ...byId(action.results.map(doc => ({ doc })))
      }
    case FAILURE:
      return {
        ...state,
        [uid]: { error: action.error }
      }
    default: return state
  }
}

export default docs
