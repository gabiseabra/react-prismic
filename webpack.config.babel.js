import {
  createConfig,
  babel,
  setOutput,
  entryPoint
} from "webpack-blocks"

const config = options => (_, { merge }) => merge(options)

export default createConfig([
  config({ resolve: { extensions: [ ".js", ".jsx" ] } }),
  entryPoint([ "babel-polyfill", "./example" ]),
  setOutput("./public/main.js"),
  babel()
])
