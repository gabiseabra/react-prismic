/* eslint-env mocha */
import React from "react"
import { shallow } from "enzyme"
import Link from "./index"

describe("<Link />", () => {
  it("renders prismic link model", () => {
    const link = { link_type: "Any", url: "http://example.com" }
    const wrapper = shallow(<Link to={link}>Test</Link>).dive()
    wrapper.find(`a[href="${link.url}"]`).should.have.length(1)
  })
})
