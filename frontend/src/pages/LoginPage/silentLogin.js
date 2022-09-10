import { refreshJwtToken } from "../../services/user_service";

export default async function silentLogin(jwtToken, refreshToken, dispatch, navigate) {
  if (!jwtToken && refreshToken) {
    refreshJwtToken(dispatch);
  } else if (jwtToken && refreshToken) {
    navigate('/home');
  }
}
