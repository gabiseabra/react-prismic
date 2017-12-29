import pick from "lodash.pick"
import React from "react"
import PropTypes from "prop-types"

const optionsProps = [ "lang", "after", "orderings", "pageSize", "page" ]

const childProps = [ "loading", "error", "data" ]

const sameOptions = (x, y) => !optionsProps.find(prop => x[prop] !== y[prop])

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
    const { load, data, loading, ...options } = this.props
    if(!loading && !(data && sameOptions(next, options))) load(this.options)
  }

  get options() { return pick(this.props, optionsProps) }

  get childProps() { return pick(this.props, childProps) }

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
