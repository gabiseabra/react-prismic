import React from "react"
import PropTypes from "prop-types"
import Slicer from "../Slicer"
import Span from "./Span"

const PrismicText = ({ tag: Component, span, spans, text, ...props }) => (
  <Component {...props}>
    <Slicer component={span} slices={spans}>{text}</Slicer>
  </Component>
)

PrismicText.propTypes = {
  tag: PropTypes.any.isRequired,
  span: PropTypes.any.isRequired,
  spans: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
}

PrismicText.defaultProps = {
  span: Span
}

export default PrismicText
