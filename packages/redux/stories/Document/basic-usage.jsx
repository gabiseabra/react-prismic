import React from "react"
import { withInfo } from "@storybook/addon-info"
import { Document } from "../../src"


const Example = () => (
  <Document type="page" uid="foo">{
    ({ error, loading, document }) => (
      <div>...</div>
    )
  }
  </Document>
)

export default withInfo({
  text: `
  PrismicProvider
  `,
  propTables: [ Document ]
})(Example)
