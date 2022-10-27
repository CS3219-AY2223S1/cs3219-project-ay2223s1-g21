import axios from "axios";
import { setJwtToken, setUserEmail, setUserId } from "../redux/actions/auth";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const handleCreateNewAccount = async (email, password) => {
  const body = { email, password };
  let statusCode = "";
  let message = "";
  const CREATE_ACCOUNT_ENDPOINT =
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/signup";
  console.log("request sent for create new acc");
  await axios
    .post(CREATE_ACCOUNT_ENDPOINT, body, { withCredentials: true })
    .then((res) => {
      statusCode = res.status;
      message = res.data.message;
    })
    .catch((err) => {
      statusCode = err.response.status;
      message = err.response.data.message;
      console.log("Account creation error, " + err);
    });

  return { statusCode, message };
};

export const handleLogin = async (email, password) => {
  const LOG_IN_ENDPOINT =
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/login";
  const body = { email, password };
  let statusCode = "";
  let id = "";
  let emailResponse = "";
  let message = "";
  let token = "";
  let refreshToken = "";
  console.log("request sent");

  await axios
    .post(LOG_IN_ENDPOINT, body, { withCredentials: true })
    .then((res) => {
      statusCode = res.status;
      emailResponse = res.data.email;
      message = res.data.message;
      id = res.data.id;
      token = res.data.token;
      refreshToken = res.data.refreshToken;
      console.log("login response OK");
    })
    .catch((err) => {
      statusCode = err.response.status;
      message = err.response.data.message;
      console.log("Login error, " + err);
    });

  return { statusCode, emailResponse, id, message, token, refreshToken };
};

export const handleLogoutAccount = () => {
  const LOG_OUT_ENDPT =
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/logout";
  return axios.post(LOG_OUT_ENDPT, null, { withCredentials: true });
};

export const refreshJwtToken = (dispatch) => {
  return axios
    .get(process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/refreshtoken?refreshToken=" + cookies.get("refreshToken"))
    .then((res) => {
      dispatch(setUserEmail(res.data.email));
      dispatch(setUserId(res.data.id));
      dispatch(setJwtToken(res.data.token));
    })
    .catch((err) => err.response.data.message);
};

export const deleteAccount = (id, jwtToken) => {
  return axios.delete(
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/delete",
    {
      headers: {
        "access-token": jwtToken,
      },
      withCredentials: true,
      data: { id },
    }
  );
};

export const changePassword = (
  id,
  currentPassword,
  newPassword,
  reNewPassword,
  jwtToken
) => {
  return axios.put(
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/changepassword",
    { id, currentPassword, newPassword, reNewPassword },
    {
      withCredentials: true,
      headers: { "access-token": jwtToken },
    }
  );
};

export const forgetPasswordRequest = (email) => {
  return axios.post(
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/requestPasswordReset",
    { email },
    {
      withCredentials: true,
    }
  );
};

export const resetPasswordRequest = (userId, token, password) => {
  return axios.put(
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/resetPassword",
    { userId, token, password },
    {
      withCredentials: true,
    }
  );
};

export const updateHistory = (id, jwtToken, history) => {
  return axios.put(
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/updateHistory",
    { id, history },
    {
      withCredentials: true,
      headers: { "access-token": jwtToken },
    }
  );
};

export const getHistory = (jwtToken, id) => {
  return axios.get(
    process.env.REACT_APP_AUTH_SERVER_URL + "/api/user/getHistory",
    {
      params: { id },
      withCredentials: true,
      headers: { "access-token": jwtToken },
    }
  );
};
