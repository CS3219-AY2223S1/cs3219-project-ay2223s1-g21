import jwt from "jsonwebtoken";

export const UNAUTHORIZED = "401 unauthorized";
const SUCCESS = "200";

const catchError = (err) => {
  var res = {
    status: UNAUTHORIZED,
    message: "Unauthorized!",
  };

  if (err instanceof TokenExpiredError) {
    res = {
      status: UNAUTHORIZED,
      message: "Unauthorized! Access Token was expired!",
    };
    console.log("Unauthorized! Access Token was expired!");
    return res;
  }

  return res;
};

export function verifyToken(token, id) {
  if (!token) {
    var res = {
      status: UNAUTHORIZED,
      message: "No token provided! Unauthorized!",
    };
    return res;
  }

  return jwt.verify(token, process.env.SECRET_AUTH_KEY, (err, decoded) => {
    if (err) {
      return catchError(err, socket);
    }

    if (id != decoded.id) {
      var res = {
        status: UNAUTHORIZED,
        message: "Unauthorized!",
      };
      console.log("Invalid token! Unauthorized!");
      return res;
    }

    return {
      status: SUCCESS,
      message: "SUCCESS",
    };
  });
}
