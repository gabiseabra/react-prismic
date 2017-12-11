import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"

const Quote = ({ primary: { quote, name_of_the_author: author } }) => (
  <blockquote>
    <RichText>{quote}</RichText>
    {author &&
    <footer>
      <RichText>{author}</RichText>
    </footer>}
  </blockquote>
)

Quote.propTypes = {
  primary: PropTypes.shape({
    name_of_the_author: RichText.shape,
    quote: RichText.shape.isRequired
  })
}

export default Quote
