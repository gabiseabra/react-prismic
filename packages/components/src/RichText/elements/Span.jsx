import React from "react"
import PropTypes from "prop-types"
import Link from "../../Link"

const PrismicSpan = ({ type, data, children, ...props }) => {
  switch(type) {
    case undefined:
      return children
    case "hyperlink":
      return <Link to={data}>{children}</Link>
    case "span":
      return <span {...props}>{children}</span>
    case "em":
    case "strong": {
      const Component = type
      return <Component {...props}>{children}</Component>
    }
    default:
      throw new Error(`Invalid span type ${type}`)
  }
}

PrismicSpan.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object.isRequired,
  children: PropTypes.node
}

PrismicSpan.defaultProps = {
  data: {}
}

export default PrismicSpan
