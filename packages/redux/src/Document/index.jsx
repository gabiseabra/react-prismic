import hash from "object-hash"
import pick from "lodash.pick"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Loader from "../Loader"
import * as reducer from "./reducer"
import {
  getDocument,
  getDocumentError,
  isDocumentLoading
} from "./selectors"

class DocumentLoader extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    uid: PropTypes.string
  }

  onLoad = () => {
    const { load, loading, type, uid } = this.props
    if(!loading) load(type, uid, this.options)
  }

  get options() {
    return pick(this.props, [
      "uid",
      "lang"
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
  data: getDocument(...args),
  error: getDocumentError(...args),
  loading: isDocumentLoading(...args)
})

const actions = {
  load: reducer.load
}

export const prismicDocument = Target => connect(props, actions)(Target)

export default prismicDocument(DocumentLoader)
