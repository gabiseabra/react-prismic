import { setDefaults } from "@storybook/addon-info"
import { configure } from "@storybook/react"

setDefaults({
  header: false,
  inline: true,
  source: true
})

function loadStories() {
  require("../stories")
  require("../packages/components/stories")
}

configure(loadStories, module)
