import {
  UPDATE_DIALOG_MSG,
  UPDATE_DIALOG_TITLE,
  UPDATE_IS_DIALOG_OPEN,
  UPDATE_LOGGED_IN_STATUS,
} from "../actionTypes";

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: UPDATE_LOGGED_IN_STATUS,
    payload: isLoggedIn,
  };
};

export const setIsDialogOpen = (isDialogOpen) => {
  return {
    type: UPDATE_IS_DIALOG_OPEN,
    payload: isDialogOpen,
  };
};

export const setDialogTitle = (dialogTitle) => {
  return {
    type: UPDATE_DIALOG_TITLE,
    payload: dialogTitle,
  };
};

export const setDialogMsg = (dialogMsg) => {
  return {
    type: UPDATE_DIALOG_MSG,
    payload: dialogMsg,
  };
};
