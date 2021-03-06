import pick from "lodash.pick"

export const CLEAR = "prismic/feed/CLEAR"
export const LOAD = "prismic/feed/LOAD"
export const REQUEST = "prismic/feed/REQUEST"
export const SUCCESS = "prismic/feed/SUCCESS"
export const FAILURE = "prismic/feed/FAILURE"

export const clear = docType => ({ type: CLEAR, docType })
export const load = (docType, page = 1, options) => ({ type: LOAD, page, docType, options })
export const request = (docType, page) => ({ type: REQUEST, docType, page })
export const success = (docType, page, { results, pagination }, options) => ({
  type: SUCCESS,
  docType,
  page,
  results,
  pagination,
  options
})
export const fail = (docType, page, error) => ({ type: FAILURE, docType, page, error })

function feed(state = {}, action) {
  switch(action.type) {
    case CLEAR:
      return (action.docType ?
        {
          ...state,
          [action.docType]: undefined
        } :
        {}
      )
    case REQUEST:
    case SUCCESS:
    case FAILURE:
      return {
        ...state,
        [action.docType]: feed.docType(state[action.docType], action)
      }
    default: return state
  }
}

const initialState = {
  pages: {},
  pagination: {}
}

feed.docType = (state = initialState, action) => {
  switch(action.type) {
    /*
    case LOAD:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.page
        }
      }
    */
    case REQUEST:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page]: { loading: true }
        }
      }
    case SUCCESS:
      return {
        ...state,
        pagination: action.pagination,
        options: action.options,
        pages: {
          ...state.pages,
          [action.page]: { docs: action.results.map(({ uid }) => uid) }
        }
      }
    case FAILURE:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page]: { error: action.error }
        }
      }
    default: return state
  }
}

export default feed
