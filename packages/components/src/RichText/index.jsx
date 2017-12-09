import React from "react"
import PropTypes from "prop-types"
import Element from "./Element"
import Slicer from "./Slicer"
import group from "./groupNodes"

/* eslint-disable react/no-array-index-key */
const PrismicRichText = ({ children: nodes, ...props }) => (
  group(nodes).map((node, i) => (
    <Element key={`${node.type}-${i}`} {...node} {...props} />
  ))
)
/* eslint-enable */

PrismicRichText.propTypes = {
  children: PropTypes.array.isRequired
}

PrismicRichText.Element = Element

PrismicRichText.Slicer = Slicer

export default PrismicRichText
