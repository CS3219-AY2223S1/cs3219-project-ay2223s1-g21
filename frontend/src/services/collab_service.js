import axios from "axios";

export const handleCheckAvaliabilty = (userId) => {
  return axios.get(
    `${process.env.REACT_APP_COLLAB_SERVER_URL}/MatchingAvaliability?"`,
    {
      params: { userId: userId },
    }
  );
};
