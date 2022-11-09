import {
  UPDATE_IS_CODE_RUNNING,
  UPDATE_TAB,
  UPDATE_EXECUTION_RESULT,
  UPDATE_QUESTION,
  RESTE_COLLAB_PG,
  UPDATE_IO_SOCKET,
  UPDATE_CODE,
  UPDATE_LANG,
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

export const setQuestion = (question) => {
  return {
    type: UPDATE_QUESTION,
    payload: question,
  };
};
export const resetCollabPg = () => {
  return {
    type: RESTE_COLLAB_PG,
  };
};

export const setSocket = (socket) => {
  return {
    type: UPDATE_IO_SOCKET,
    payload: socket,
  };
};

export const setCode = (code) => {
  return {
    type: UPDATE_CODE,
    payload: code,
  };
};

export const setLang = (lang) => {
  return {
    type: UPDATE_LANG,
    payload: lang,
  };
};
