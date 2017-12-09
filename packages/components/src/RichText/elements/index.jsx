import React from "react"
import Text from "./Text"
import List from "./List"
import Image from "./Image"
// import Embed from "./Embed"

export { Text, List, Image }

export const withTag = tag => (Element) => {
  // eslint-disable-next-line react/prop-types
  const fun = props => <Element {...props} tag={props.tag || tag} />
  fun.BaseElement = Element
  return fun
}

export default {
  heading1: withTag("h1")(Text),
  heading2: withTag("h2")(Text),
  heading3: withTag("h3")(Text),
  heading4: withTag("h4")(Text),
  heading5: withTag("h5")(Text),
  heading6: withTag("h6")(Text),
  paragraph: withTag("p")(Text),
  preformatted: withTag("pre")(Text),
  "group-list-item": withTag("ul")(List),
  "group-o-list-item": withTag("ol")(List),
  image: Image
}
