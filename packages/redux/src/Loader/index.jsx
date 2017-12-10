import React from "react"
import PropTypes from "prop-types"
import eql from "deep-equal"

const optionsProps = {
  lang: PropTypes.string,
  pageSize: PropTypes.number,
  page: PropTypes.number
}

const childProps = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  document: PropTypes.object,
  documents: PropTypes.arrayOf(PropTypes.object)
}

const extract = (src, propTypes) => {
  const result = {}
  Object.keys(propTypes).forEach((key) => {
    result[key] = src[key]
  })
  return result
}

class PrismicLoader extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    uid: PropTypes.string,
    component: PropTypes.any, // ?
    children: PropTypes.func,
    load: PropTypes.func.isRequired,
    ...childProps,
    ...optionsProps
  }

  componentWillMount() {
    const { load } = this.props
    load(this.options)
  }

  componentWillReceiveProps(next) {
    const { load } = this.props
    const options = extract(next, optionsProps)
    const hasDocument = (!next.document || !next.documents)
    const sameOptions = eql(this.options, options)
    const sameDocument = (next.type === this.props.type && next.uid === this.props.uid)
    if(!hasDocument || !sameOptions || !sameDocument) {
      load(options)
    }
  }

  get options() { return extract(this.props, optionsProps) }

  get childProps() { return extract(this.props, childProps) }

  render() {
    const { children, component: Component } = this.props
    const props = this.childProps
    if(Component) {
      return <Component {...props} />
    }
    return children(props)
  }
}

export default PrismicLoader
