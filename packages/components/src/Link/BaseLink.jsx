import React from "react"
import PropTypes from "prop-types"

export const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>{children}</a>
)

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Link
