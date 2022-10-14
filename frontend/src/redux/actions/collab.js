import { UPDATE_QUESTION } from "../actionTypes"

export const setQuestion = (question) => {
  return {
    type: UPDATE_QUESTION,
    payload: question
  }
}