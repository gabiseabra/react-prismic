import { createSelector } from "reselect"
import { getDocType } from "../Document/selectors"

export const getAllFeed = state => state.prismic.feed

export const getFeed = createSelector(
  getAllFeed,
  (state, { type }) => type,
  (feed, type) => feed[type] || {}
)

export const getPagination = createSelector(getFeed, feed => feed.pagination || {})

export const getPageData = createSelector(
  getFeed,
  (state, { page }) => page,
  (pages, page) => pages[page] || {}
)

export const getPageDocuments = createSelector(
  getDocType,
  getPageData,
  (documents, page) => (page.docs ? page.docs.map(uid => documents[uid]) : undefined)
)

export const getPageError = createSelector(getPageData, page => page.error)

export const isPageLoading = createSelector(getPageData, page => Boolean(page.loading))
