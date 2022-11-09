import { UPDATE_DIFFICULTY, UPDATE_ROOM_ID } from "../actionTypes";

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
