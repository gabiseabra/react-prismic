import React from "react"
import PropTypes from "prop-types"

const PrismicSliceZone = ({ slices, schema }) => (
  slices.map(({ items, primary, slice_type: type, slice_label: label }) => {
    if(!(type in schema)) {
      throw new Error(`Invalid schema! Slice type ${type} was not defined.`)
    }
    // TODO: make generic slice
    const Component = schema[type]
    return <Component items={items} primary={primary} type={type} label={label} />
  })
)

PrismicSliceZone.propTypes = {
  slices: PropTypes.arrayOf(PropTypes.object).isRequired,
  schema: PropTypes.objectOf(
    PropTypes.func // Component = ({ items, primary, schema, type, label }) => ...
  ).isRequired
}

export default PrismicSliceZone
