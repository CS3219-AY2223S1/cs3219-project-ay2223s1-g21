import { UPDATE_LOGGED_IN_STATUS } from "../actionTypes"

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: UPDATE_LOGGED_IN_STATUS,
    payload: isLoggedIn
  }
}