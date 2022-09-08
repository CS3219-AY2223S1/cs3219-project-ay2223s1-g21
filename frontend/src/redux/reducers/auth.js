import { UPDATE_LOGGED_IN_STATUS } from "../actionTypes"

const initialState = {
  isLoggedIn : false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOGGED_IN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload
      }

    default:
      return state;
  }
}