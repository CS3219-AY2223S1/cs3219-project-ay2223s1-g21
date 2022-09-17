import { UPDATE_DIFFICULTY } from "../actionTypes"

export const setDifficulty = (difficulty) => {
  return {
    type: UPDATE_DIFFICULTY,
    payload: difficulty
  }
}