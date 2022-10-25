import {
  UPDATE_DIFFICULTY,
  UPDATE_QUESTION,
  UPDATE_ROOM_ID,
} from "../actionTypes";

const initialState = {
  difficulty: "",
  roomId: null,
  question: null,
};

export default function matchingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
      };
    case UPDATE_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    default:
      return state;
  }
}
