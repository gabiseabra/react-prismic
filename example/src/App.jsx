import React from "react"
import { PrismicDocument, PrismicFeed } from "../../packages/redux/src"
import Single from "./Single"
import Repeatable from "./Repeatable"

export default () => (
  <div>
    <h1>Single Type</h1>
    <PrismicDocument type="single" component={Single} />
    <h1>Repeatable</h1>
    <PrismicFeed page={1} type="repeatable" component={Repeatable} />
  </div>
)
