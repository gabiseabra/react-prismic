export const CLEAR = "prismic/feed/CLEAR"
export const LOAD = "prismic/feed/LOAD"
export const REQUEST = "prismic/feed/REQUEST"
export const SUCCESS = "prismic/feed/SUCCESS"
export const FAILURE = "prismic/feed/FAILURE"

export const clear = () => ({ type: CLEAR })
export const load = (docType, page = 1, options) => ({ type: LOAD, page, docType, options })
export const request = (docType, page) => ({ type: REQUEST, docType, page })
export const success = (docType, page, { results, pagination }) => ({
  type: SUCCESS,
  docType,
  page,
  results,
  pagination
})
export const fail = (docType, page, error) => ({ type: FAILURE, docType, page, error })

function feed(state = {}, action) {
  switch(action.type) {
    case CLEAR:
      return {}
    case REQUEST:
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
        pages: {
          ...state.pages,
          [action.page]: { docs: action.results.map(({ id }) => id) }
        }
      }
    case FAILURE:
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page]: { error: state.error }
        }
      }
    default: return state
  }
}
