import { UPDATE_QUESTION } from "../actionTypes";

const initialState = {
  question: {
    title: "Fetching..",
    difficulty: "",
    instruction: "Fetching..",
    examples: [],
    constraints: [],
  },
};

export default function collabReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

    default:
      return state;
  }
}
