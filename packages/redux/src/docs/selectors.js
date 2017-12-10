import { createSelector } from "reselect"

export const getAllDocuments = state => state.prismic.docs

export const getDocType = createSelector(
  getAllDocuments,
  (state, { type }) => type,
  (documents, type) => documents[type] || {}
)

export const getDocumentData = createSelector(
  getDocType,
  (state, { uid }) => uid,
  (docType, uid) => (uid ? docType[uid] : docType.only) || {}
)

export const getDocument = createSelector(getDocumentData, doc => doc.doc)

export const getDocumentError = createSelector(getDocumentData, doc => doc.error)

export const isDocumentLoading = createSelector(getDocumentData, doc => Boolean(doc.loading))
