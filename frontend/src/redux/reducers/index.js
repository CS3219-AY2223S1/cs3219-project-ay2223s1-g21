import {combineReducers} from "redux";
import authReducer from "./auth";
import matchingReducer from "./matching";
import collabReducer from "./collab"

export default combineReducers({
    authReducer,
    matchingReducer,
    collabReducer
  }
);