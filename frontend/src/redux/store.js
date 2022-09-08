import { createStore } from "redux";
import allReducers from "./reducers";

const store = createStore(
  allReducers,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
