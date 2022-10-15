import axios from "axios";

export const fetchQuestion = (difficulty) => {
  return axios.get(
    process.env.REACT_APP_QUESTION_SERVER_URL +
      "/question?difficulty=" +
      difficulty
  );
};
