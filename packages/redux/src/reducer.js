import { combineReducers } from "redux"
import feed from "./Feed/reducer"
import docs from "./Document/reducer"

export default combineReducers({ feed, docs })
