import React from "react"
import PropTypes from "prop-types"
import { prismicShape, withPrismic } from "../Provider"
import BaseLink from "./BaseLink"

const PrismicLink = ({ to: link, children, resolve, DocLink, ...props }) => {
  const text = children || link.url
  if(link.link_type === "Document") {
    return <DocLink to={resolve(link)} {...props}>{text}</DocLink>
  }
  return <a href={link.url} {...props}>{text}</a>
}


PrismicLink.shape = PropTypes.shape({
  link_type: PropTypes.string.isRequired,
  url: PropTypes.string,
  type: PropTypes.string,
  uid: PropTypes.string
})

PrismicLink.propTypes = {
  to: PrismicLink.shape.isRequired,
  prismic: prismicShape,
  children: PropTypes.node,
  resolve: PropTypes.func,
  DocLink: PropTypes.any
}

PrismicLink.defaultProps = {
  DocLink: BaseLink
}

export default withPrismic("resolve", "DocLink")(PrismicLink)
