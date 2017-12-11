/* eslint-env mocha */
import React from "react"
import { mount } from "enzyme"
import Link from "../Link"
import PrismicProvider from "./index"

describe("<PrismicProvider />", () => {
  it("provides a default link resolver", () => {
    const link = { link_type: "Document", type: "foo", uid: "bar" }
    const wrapper = mount(
      <PrismicProvider>
        <Link to={link}>Test</Link>
      </PrismicProvider>)
    wrapper.find("a[href='/foo/bar']").should.be.present()
  })

})
