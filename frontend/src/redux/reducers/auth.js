import { SET_LOADING_SCREEN, UPDATE_JWT_TOKEN, UPDATE_LOGGED_IN_STATUS, UPDATE_USER_EMAIL, UPDATE_USER_ID } from "../actionTypes"

const initialState = {
  isLoggedIn : false,
  isLoading: false,
  jwtToken: "",
  userId: "",
  userEmail: ""
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOGGED_IN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload
      }
    
    case SET_LOADING_SCREEN:
      return {
        ...state,
        isLoading: action.payload
      }

    case UPDATE_JWT_TOKEN:
      return {
        ...state,
        jwtToken: action.payload
      }
    
    case UPDATE_USER_ID:
      return {
        ...state,
        userId: action.payload
      }

    case UPDATE_USER_EMAIL:
      return {
        ...state,
        userEmail: action.payload
      }
      
    default:
      return state;
  }
}