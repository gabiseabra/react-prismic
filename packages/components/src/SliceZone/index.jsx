import React from "react"
import PropTypes from "prop-types"

const PrismicSliceZone = ({ children: slices, schema }) => (
  slices.map(({ items, primary, slice_type: type, slice_label: label }, i) => {
    if(!(type in schema)) {
      throw new Error(`Invalid schema! Slice type ${type} was not defined.`)
    }
    const Component = schema[type]
    return (
      <Component
        key={`${type}-${i}`}
        items={items}
        primary={primary}
        type={type}
        label={label} />
    )
  })
)

PrismicSliceZone.shape = PropTypes.arrayOf(PropTypes.object)

PrismicSliceZone.propTypes = {
  children: PrismicSliceZone.shape.isRequired,
  schema: PropTypes.objectOf(
    PropTypes.func // Component = ({ items, primary, schema, type, label }) => ...
  ).isRequired
}

export default PrismicSliceZone
