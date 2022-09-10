import {
  SET_LOADING_SCREEN,
  UPDATE_JWT_TOKEN,
  UPDATE_USER_EMAIL,
  UPDATE_USER_ID,
  LOG_OUT_ACCOUNT
} from "../actionTypes";

export const setLogout = () => {
  return {
    type: LOG_OUT_ACCOUNT
  }
}

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