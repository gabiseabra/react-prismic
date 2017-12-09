import { configure } from "@storybook/react"


function loadStories() {
  require("../stories")
  require("../packages/components/stories")
}

configure(loadStories, module)
