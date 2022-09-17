import {combineReducers} from "redux";
import authReducer from "./auth";
import matchingReducer from "./matching";

export default combineReducers({
    authReducer,
    matchingReducer,
  }
);