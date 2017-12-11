import React from "react"
import { RichText, SliceZone } from "../../packages/components/src"
import { Text, Gallery, Quote } from "../../packages/components/src/SliceZone/schema"

const schema = {
  text: Text,
  image_gallery: Gallery,
  quote: Quote
}

const Doc = ({ title, rich_text, body }) => (
  <div>
    <RichText>{title}</RichText>
    <RichText>{rich_text}</RichText>
    <hr />
    <SliceZone schema={schema}>{body}</SliceZone>
  </div>
)

const Feed = ({ documents }) => (
  <div>
    {documents && documents.map(doc => <Doc key={doc.uid} {...doc.data} />)}
  </div>
)

export default Feed
