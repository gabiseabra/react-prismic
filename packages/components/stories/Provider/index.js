import { storiesOf } from "@storybook/react"
import basic from "./basic-usage"

console.log(storiesOf)

storiesOf("Provider", module)
  .add("basic usage", basic)
