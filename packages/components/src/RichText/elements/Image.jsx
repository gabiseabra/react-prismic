import React from "react"
import PropTypes from "prop-types"

const PrismicImage = ({ url, alt }) => (
  <img src={url} alt={alt} style={{ margin: "0 auto", maxWidth: "100%" }} />
)

PrismicImage.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string
}

export default PrismicImage
