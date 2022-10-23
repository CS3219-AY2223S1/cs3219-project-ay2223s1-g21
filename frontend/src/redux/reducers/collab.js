import {
  UPDATE_CURRENT_MODE,
  UPDATE_EXECUTION_RESULT,
  UPDATE_IS_CODE_RUNNING,
  UPDATE_TAB,
} from "../actionTypes";

const initialState = {
  isCodeRunning: false,
  selectedTab: "Description",
  codeResult: "Press Run Code or Ctrl + Enter to run your code.",
  curMode: "javascript",
};

export default function collabReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_CODE_RUNNING:
      return {
        ...state,
        isCodeRunning: action.payload,
      };

    case UPDATE_EXECUTION_RESULT:
      return {
        ...state,
        codeResult: action.payload,
      };

    case UPDATE_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };

    case UPDATE_CURRENT_MODE:
      return {
        ...state,
        curMode: action.payload,
      };

    default:
      return state;
  }
}
