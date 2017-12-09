import React from "react"
import PropTypes from "prop-types"
import elements from "./elements"

const PrismicElement = (props) => {
  let Element = elements[props.type]
  if(props.tag) Element = Element.BaseElement
  return <Element {...props} />
}

PrismicElement.propTypes = {
  tag: PropTypes.any,
  type: PropTypes.string.isRequired
}

export default PrismicElement
