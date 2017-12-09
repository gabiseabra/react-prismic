import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
import { PrismicProvider } from "../src"

storiesOf("Provider", module)
  .add("basic usage", () => (
    <PrismicProvider>
      Hello World
    </PrismicProvider>
  ))
