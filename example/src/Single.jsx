import React from "react"
import { Link } from "../../packages/components/src"

const Doc = ({ document: doc }) => (
  <div>
    {doc &&
    <Link to={doc.data.link}>
      {doc.data.text}
    </Link>}
  </div>
)

export default Doc
