import React from "react"
import PropTypes from "prop-types"
import flow from "lodash.flow"

export const prismicShape = {
  resolve: PropTypes.func.isRequired,
  DocLink: PropTypes.any.isRequired
}

// Default Link component
export const Link = ({ to, ...props }) => <a href={to} {...props} />

Link.propTypes = {
  to: PropTypes.string.isRequired
}

export default class PrismicProvider extends React.Component {
  static Link = Link

  static propTypes = {
    resolve: PropTypes.func.isRequired,
    Link: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    resolve: (type, uid) => `/${type}/${uid}`,
    Link
  }

  static childContextTypes = {
    prismic: prismicShape
  }

  getChildContext() {
    return {
      prismic: {
        resolve: flow(
          this.props.resolve,
          href => href.replace(/\/*$/, "")
        ),
        DocLink: this.props.Link
      }
    }
  }

  render() {
    return this.props.children
  }
}

export const withPrismicContext = (Component) => {
  const Context = (props, ctx) => <Component {...props} {...ctx} />
  Context.contextTypes = {
    prismic: prismicShape
  }
  return Context
}
