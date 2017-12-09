import React from "react"
import PropTypes from "prop-types"
import Text from "./Text"

/* eslint-disable react/no-array-index-key */
const PrismicList = ({ tag: Component, children, ...props }) => (
  <Component {...props}>
    {children.map((item, i) => <Text tag="li" key={`${item.type}-${i}`} {...item} />)}
  </Component>
)
/* eslint-enable */

PrismicList.propTypes = {
  tag: PropTypes.any.isRequired,
  children: PropTypes.array.isRequired
}

export default PrismicList
