import { createStore, combineReducers } from "redux"
import { prismicReducer } from "../src"

const reducer = combineReducers({
  prismic: prismicReducer
})

export default function create(state) {
  return createStore(reducer, state)
}
