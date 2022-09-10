import {
  LOG_OUT_ACCOUNT,
  SET_LOADING_SCREEN,
  UPDATE_JWT_TOKEN,
  UPDATE_USER_EMAIL,
  UPDATE_USER_ID,
} from "../actionTypes";

const initialState = {
  isLoading: false,
  jwtToken: "",
  userId: "",
  userEmail: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_OUT_ACCOUNT: {
      return initialState;
    }

    case SET_LOADING_SCREEN:
      return {
        ...state,
        isLoading: action.payload,
      };

    case UPDATE_JWT_TOKEN:
      return {
        ...state,
        jwtToken: action.payload,
      };

    case UPDATE_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };

    case UPDATE_USER_EMAIL:
      return {
        ...state,
        userEmail: action.payload,
      };

    default:
      return state;
  }
}
