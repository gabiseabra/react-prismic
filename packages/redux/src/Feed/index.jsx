import hash from "object-hash"
import pick from "lodash.pick"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Loader from "../Loader"
import * as reducer from "./reducer"
import {
  getPageDocuments,
  getPageError,
  isPageLoading
} from "./selectors"

class FeedLoader extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    load: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
  }

  onLoad = () => {
    const { load, loading, type, page } = this.props
    if(!loading) load(type, page, this.options)
  }

  get options() {
    return pick(this.props, [
      "page",
      "lang",
      "after",
      "orderings",
      "pageSize"
    ])
  }

  get key() {
    return hash(this.options)
  }

  render() {
    return (
      <Loader
        {...this.props}
        key={this.key}
        onLoad={this.onLoad} />
    )
  }
}

const props = (...args) => ({
  data: getPageDocuments(...args),
  error: getPageError(...args),
  loading: isPageLoading(...args)
})

const actions = {
  load: reducer.load
}

export const prismicFeed = Target => connect(props, actions)(Target)

export default prismicFeed(FeedLoader)
