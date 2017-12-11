import React from "react"
import PropTypes from "prop-types"
import Image from "../../Image"
import RichText from "../../RichText"

const Gallery = ({ primary: { name_of_the_gallery: title }, items }) => (
  <div>
    {title && <RichText>{title}</RichText>}
    <div style={{ display: "flex" }}>
      {items.map(({ gallery_image: image, image_captions: caption }, i) => (
        <div key={`img-${i}`}>
          <Image>{image}</Image>
          <RichText>{caption}</RichText>
        </div>
      ))}
    </div>
  </div>
)

Gallery.propTypes = {
  primary: PropTypes.shape({
    name_of_the_gallery: RichText.shape
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    gallery_image: Image.shape,
    image_captions: RichText.shape
  }))
}

export default Gallery
