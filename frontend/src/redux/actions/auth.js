import {
  SET_LOADING_SCREEN,
  UPDATE_JWT_TOKEN,
  UPDATE_LOGGED_IN_STATUS,
  UPDATE_USER_EMAIL,
  UPDATE_USER_ID,
} from "../actionTypes";

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: UPDATE_LOGGED_IN_STATUS,
    payload: isLoggedIn,
  };
};


export const setIsLoading = (isLoading) => {
  return {
    type: SET_LOADING_SCREEN,
    payload: isLoading
  }
}

export const setJwtToken = (token) => {
  return {
    type: UPDATE_JWT_TOKEN,
    payload: token
  }
}

export const setUserId = (userId) => {
  return {
    type: UPDATE_USER_ID,
    payload: userId
  }
}

export const setUserEmail = (userEmail) => {
  return {
    type: UPDATE_USER_EMAIL,
    payload: userEmail
  }
}