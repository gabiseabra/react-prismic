import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"

const Text = ({ primary: { text } }) => (
  <RichText>{text}</RichText>
)

Text.propTypes = {
  primary: PropTypes.shape({
    text: RichText.shape
  })
}

export default Text
