import React from "react"
import PropTypes from "prop-types"
import flow from "lodash.flow"

export const prismicShape = PropTypes.shape({
  resolve: PropTypes.func.isRequired,
  DocLink: PropTypes.any
})

export default class PrismicProvider extends React.Component {
  static propTypes = {
    resolve: PropTypes.func.isRequired,
    Link: PropTypes.any,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    resolve: ({ type, uid }) => `/${type}/${uid}`
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

const extract = keys => (object = {}) => {
  const result = {}
  keys.forEach((key) => {
    result[key] = object[key]
  })
  return result
}

export const withPrismic = (...keys) => (Component) => {
  const Context = (props, ctx) => (
    <Component
      {...Context.extract(ctx.prismic)}
      {...props} />
  )
  Context.extract = extract(keys)
  Context.contextTypes = {
    prismic: prismicShape
  }
  return Context
}
