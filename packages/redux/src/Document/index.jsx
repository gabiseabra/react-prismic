import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Loader from "../Loader"
import * as reducer from "./reducer"
import {
  getDocument,
  getDocumentError,
  isDocumentLoading
} from "./selectors"

const DocumentLoader = ({ load, ...rest }) => (
  <Loader load={options => load(rest.type, rest.uid, options)} {...rest} />
)

DocumentLoader.propTypes = {
  load: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  uid: PropTypes.string
}

const props = (...args) => ({
  data: getDocument(...args),
  error: getDocumentError(...args),
  loading: isDocumentLoading(...args)
})

const actions = {
  load: reducer.load
}

export const prismicDocument = Component => connect(props, actions)(Component)

export default prismicDocument(DocumentLoader)
