import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Loader from "../Loader"
import * as reducer from "./reducer"
import {
  getPageDocuments,
  getPageError,
  isPageLoading
} from "./selectors"

const FeedLoader = ({ load, page, ...rest }) => (
  <Loader load={options => load(rest.type, page, options)} {...rest} />
)

FeedLoader.propTypes = {
  page: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  uid: PropTypes.string
}

const props = (...args) => ({
  data: getPageDocuments(...args),
  error: getPageError(...args),
  loading: isPageLoading(...args)
})

const actions = {
  load: reducer.load
}

export const prismicFeed = Component => connect(props, actions)(Component)

export default prismicFeed(FeedLoader)
