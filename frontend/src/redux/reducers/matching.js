import { UPDATE_DIFFICULTY, UPDATE_ROOM_ID } from "../actionTypes";

const initialState = {
  difficulty: "",
  roomId: "",
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
    default:
      return state;
  }
}
