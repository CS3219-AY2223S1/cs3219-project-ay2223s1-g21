import { refreshJwtToken } from "../../services/user_service";

export default async function silentLogin(jwtToken, dispatch, navigate, fromUrl) {
  if (!jwtToken) {
    refreshJwtToken(dispatch);
  } else {
    navigate(fromUrl || "/home");
  }
}
