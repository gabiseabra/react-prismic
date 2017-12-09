import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-info"
import { PrismicProvider } from "../src"

storiesOf("components/Provider", module)
  .add("basic usage", () => (
    <PrismicProvider>
      Hello World
    </PrismicProvider>
  ))

