import { UPDATE_DIALOG_MSG, UPDATE_DIALOG_TITLE, UPDATE_IS_DIALOG_OPEN, UPDATE_LOGGED_IN_STATUS } from "../actionTypes"

const initialState = {
  isLoggedIn : false,
  isDialogOpen: false,
  dialogTitle: "",
  dialogMsg: ""
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOGGED_IN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload
      }

    case UPDATE_IS_DIALOG_OPEN:
      return {
        ...state,
        isDialogOpen: action.payload
      }

    case UPDATE_DIALOG_TITLE:
      return {
        ...state,
        dialogTitle: action.payload
      }

    case UPDATE_DIALOG_MSG:
      return {
        ...state,
        dialogMsg: action.payload
      }

    default:
      return state;
  }
}