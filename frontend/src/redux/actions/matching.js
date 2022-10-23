import {
  UPDATE_DIFFICULTY,
  UPDATE_QUESTION,
  UPDATE_ROOM_ID,
} from "../actionTypes";

export const setDifficulty = (difficulty) => {
  return {
    type: UPDATE_DIFFICULTY,
    payload: difficulty,
  };
};

export const setRoomId = (roomId) => {
  return {
    type: UPDATE_ROOM_ID,
    payload: roomId,
  };
};

export const setQuestion = (question) => {
  return {
    type: UPDATE_QUESTION,
    payload: question,
  };
};
