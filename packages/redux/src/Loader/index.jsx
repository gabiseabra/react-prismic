import pick from "lodash.pick"
import React from "react"
import PropTypes from "prop-types"
import eql from "deep-equal"

const optionsProps = [ "lang", "after", "orderings", "pageSize", "page" ]

const childProps = [ "loading", "error", "data" ]

class PrismicLoader extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    uid: PropTypes.string,
    component: PropTypes.any, // ?
    children: PropTypes.func,
    load: PropTypes.func.isRequired,
    // optionsProps
    lang: PropTypes.string,
    after: PropTypes.string,
    orderings: PropTypes.string,
    pageSize: PropTypes.number,
    page: PropTypes.number,
    // childProps
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    data: PropTypes.any
  }

  componentWillMount() {
    const { load } = this.props
    load(this.options)
  }

  componentWillReceiveProps(next) {
    const { load, data, loading } = this.props
    if(data || loading) return
    const options = pick(optionsProps, next)
    const sameOptions = eql(this.options, options)
    const sameDocument = (next.type === this.props.type && next.uid === this.props.uid)
    if(sameOptions || !sameDocument) return
    load(options)
  }

  get options() { return pick(optionsProps, this.props) }

  get childProps() { return pick(childProps, this.props) }

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
