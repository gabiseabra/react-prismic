import React from "react"
import { withInfo } from "@storybook/addon-info"
import { MemoryRouter, Link, withRouter } from "react-router-dom"
import { PrismicProvider, Link as PrismicLink } from "../../src"

const CurrentPage = withRouter(({ location }) => (
  <p>You are in {location.pathname}</p>
))

const Example = () => (
  <MemoryRouter>
    <div>
      <CurrentPage />
      <PrismicProvider Link={Link}>
        <PrismicLink to={{ link_type: "Document", type: "page", uid: "foo" }}>Click here</PrismicLink>
      </PrismicProvider>
    </div>
  </MemoryRouter>
)

export default withInfo({
  text: `
  AAA
  `
})(Example)
