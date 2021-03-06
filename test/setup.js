import "babel-polyfill"
import { JSDOM } from "jsdom"
import chai from "chai"
import chaiEnzyme from "chai-enzyme"
// import chaiAsPromised from "chai-as-promised"
// import chaiThings from "chai-things"
import enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"

process.env.PRISMIC_REPO = process.env.PRISMIC_REPO || "example-repo"

const dom = new JSDOM("<!doctype html><html><body></body></html>")

enzyme.configure({ adapter: new Adapter() })

global.window = dom.window
global.document = dom.window.document
global.navigator = { userAgent: "node.js" }

chai.use(chaiEnzyme())
// chai.use(chaiAsPromised)
// chai.use(chaiThings)

global.should = chai.should()
global.expect = chai.expect
