import { storiesOf } from "@storybook/react"

storiesOf("Provider", module)
  .add("basic usage", require("./basic-usage").default)
  .add("react-router", require("./react-router").default)
