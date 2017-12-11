import React from "react"
import { RichText } from "../../packages/components/src"

const schema = {
}

const Doc = ({ title, rich_text, body }) => (
  <div>
    <RichText>{title}</RichText>
    <RichText>{rich_text}</RichText>
  </div>
)

const Feed = ({ documents }) => (
  <div>
    {documents && documents.map(doc => <Doc key={doc.uid} {...doc.data} />)}
  </div>
)

export default Feed
