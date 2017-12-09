import React from "react"
import { withInfo } from "@storybook/addon-info"
import { PrismicProvider } from "../../src"

const Example = () => (
  <PrismicProvider>
    Hello World!
  </PrismicProvider>
)

export default withInfo({
  text: `
  PrismicProvider
  `,
  propTables: [ PrismicProvider ],
})(Example)
