import pick from "lodash.pick"
import React from "react"
import PropTypes from "prop-types"

const childProps = [ "loading", "error", "data" ]

class PrismicLoader extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    uid: PropTypes.string,
    component: PropTypes.any, // ?
    children: PropTypes.func,
    onLoad: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    data: PropTypes.any
  }

  componentDidMount() {
    const { onLoad, loading } = this.props
    if(!loading) onLoad(this.options)
  }

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
