import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PrismicProvider } from "../packages/components/src"
import createStore from "./store"
import App from "./src/App"

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <PrismicProvider>
      <App />
    </PrismicProvider>
  </Provider>,
  document.getElementById("app")
)
