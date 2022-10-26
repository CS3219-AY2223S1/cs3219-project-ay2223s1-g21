import {
  UPDATE_IS_CODE_RUNNING,
  UPDATE_TAB,
  UPDATE_EXECUTION_RESULT,
  UPDATE_CURRENT_MODE,
  RESTE_COLLAB_PG
} from "../actionTypes";

export const setIsCodeRunning = (isCodeRunning) => {
  return {
    type: UPDATE_IS_CODE_RUNNING,
    payload: isCodeRunning,
  };
};

export const setCodeExecutionResult = (result) => {
  return {
    type: UPDATE_EXECUTION_RESULT,
    payload: result,
  };
};

export const setTab = (tab) => {
  return {
    type: UPDATE_TAB,
    payload: tab,
  };
};

export const setMode = (mode) => {
  return {
    type: UPDATE_CURRENT_MODE,
    payload: mode,
  };
};

export const resetCollabPg = () => {
  return {
    type: RESTE_COLLAB_PG
  }
}