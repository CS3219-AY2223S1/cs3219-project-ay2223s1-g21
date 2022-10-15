import {
  UPDATE_CURRENT_MODE,
  UPDATE_EXECUTION_RESULT,
  UPDATE_IS_CODE_RUNNING,
  UPDATE_QUESTION,
  UPDATE_TAB,
  UPDATE_CODE
} from "../actionTypes";

const initialState = {
  question: {
    title: "Fetching..",
    difficulty: "",
    instruction: "Fetching..",
    examples: [],
    constraints: [],
  },
  isCodeRunning: false,
  selectedTab: "Description",
  codeResult: "Press Run Code or Ctrl + Enter to run your code.",
  code: `console.log("Hello World!");`,
  curMode: "javascript",
};

export default function collabReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

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

    case UPDATE_CODE:
      return {
        ...state,
        code: action.payload,
      };

    default:
      return state;
  }
}
