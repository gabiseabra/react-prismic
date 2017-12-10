import React from "react"
import { storiesOf } from "@storybook/react"
import { Provider } from "react-redux"
import createStore from "../store"

storiesOf("Document", module)
  .addDecorator(story => <Provider store={createStore()}>{story()}</Provider>)
  .add("basic usage", require("./basic-usage").default)
