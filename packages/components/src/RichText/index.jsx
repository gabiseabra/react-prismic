import React from "react"
import PropTypes from "prop-types"
import BaseElement from "./Element"
import Slicer from "./Slicer"
import group from "./groupNodes"
import { withPrismic } from "../Provider"

/* eslint-disable react/no-array-index-key */
const _PrismicRichText = ({ children: nodes, Element, ...props }) => (
  group(nodes).map((node, i) => (
    <Element key={`${node.type}-${i}`} {...node} {...props} />
  ))
)
/* eslint-enable */

const PrismicRichText = withPrismic("Element")(_PrismicRichText)

PrismicRichText.shape = PropTypes.array

PrismicRichText.propTypes = {
  children: PrismicRichText.shape.isRequired,
  Element: PropTypes.any.isRequired
}

PrismicRichText.defaultProps = {
  Element: BaseElement
}

PrismicRichText.Element = BaseElement

PrismicRichText.Slicer = Slicer

export default PrismicRichText
