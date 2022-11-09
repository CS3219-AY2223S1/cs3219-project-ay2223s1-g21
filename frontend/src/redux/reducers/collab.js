import {
  UPDATE_EXECUTION_RESULT,
  UPDATE_IS_CODE_RUNNING,
  UPDATE_TAB,
  UPDATE_QUESTION,
  RESTE_COLLAB_PG,
  UPDATE_IO_SOCKET,
  UPDATE_LANG,
  UPDATE_CODE,
} from "../actionTypes";

const initialState = {
  isCodeRunning: false,
  selectedTab: "Description",
  codeResult: "Press Run Code or Ctrl + Enter to run your code.",
  question: null,
  code: "",
  lang: "",
  socket: null,
};

export default function collabReducer(state = initialState, action) {
  switch (action.type) {
    case RESTE_COLLAB_PG:
      return initialState;

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

    case UPDATE_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

    case UPDATE_IO_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };

    case UPDATE_LANG:
      return {
        ...state,
        lang: action.payload,
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
