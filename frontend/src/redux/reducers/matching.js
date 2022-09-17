import { UPDATE_DIFFICULTY } from "../actionTypes";

const initialState = {
  difficulty: "",
};

export default function matchingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DIFFICULTY: 
      return {
        ...state,
        difficulty: action.payload
      }

    default:
      return state;
  }
}