import React from "react"
import PropTypes from "prop-types"

const PrismicImage = ({ children: image, ...props }) => (
  <img src={image.url} alt={image.alt} {...props} />
)

PrismicImage.propTypes = {
  children: PropTypes.object.isRequired
}

export default PrismicImage
