import React from "react"
import PropTypes from "prop-types"
import elements from "./elements"

const propTypes = {
  tag: PropTypes.any,
  type: PropTypes.string.isRequired
}

export const createPrismicElement = (e) => {
  const Wrapper = (props) => {
    let Element = e[props.type]
    if(props.tag) Element = Element.BaseElement
    return <Element {...props} />
  }
  Wrapper.propTypes = propTypes
  return Wrapper
}

export default createPrismicElement(elements)
