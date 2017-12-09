import React from "react"
import PropTypes from "prop-types"

// Render prismic's rich text model
const Slicer = ({ component: Component, children: text, slices }) => {
  const components = []
  let i = 0
  const slice = (end = text.length) => {
    const result = text.substring(i, end)
    i = end
    return result
  }
  const span = (end, props = {}) => (
    <Component key={i} {...props}>{slice(end)}</Component>
  )
  slices.forEach(({ start, end, ...data }) => {
    if(i < start) components.push(span(start))
    components.push(span(end, data))
  })
  components.push(span())
  return components
}

Slicer.propTypes = {
  component: PropTypes.any.isRequired,
  slices: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
  })).isRequired,
  children: PropTypes.string.isRequired
}

export default Slicer
