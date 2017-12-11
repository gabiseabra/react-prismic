import React from "react"
import { PrismicDocument, PrismicFeed } from "../../packages/redux/src"
import Doc from "./Doc"
import Feed from "./Feed"

export default () => (
  <div>
    <h1>Single Type</h1>
    <PrismicDocument type="single" component={Doc} />
    <h1>Repeatable</h1>
    <PrismicFeed type="repeatable" component={Feed} />
  </div>
)
