import React from "react"
import PropTypes from "prop-types"
import { prismicShape, withPrismicContext } from "../Provider"

const PrismicLink = ({ to: link, children, prismic: { resolve, DocLink }, ...props }) => {
  const text = children || link.url
  if(link.link_type === "Document") {
    return <DocLink to={resolve(link)} {...props}>{text}</DocLink>
  }
  return <a href={link.url} {...props}>{text}</a>
}

PrismicLink.propTypes = {
  to: PropTypes.object.isRequired,
  resolver: PropTypes.func,
  prismic: prismicShape,
  children: PropTypes.node
}

export default withPrismicContext(PrismicLink)
