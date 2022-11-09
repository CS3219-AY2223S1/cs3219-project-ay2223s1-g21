const jwt = require("jsonwebtoken");
const responseStatus = require("../constants/ResponseStatus");
const { TokenExpiredError } = jwt;

const catchError = (err, socket) => {
  var res = {
    status: responseStatus.UNAUTHORIZED,
    message: "Unauthorized!",
  };

  if (err instanceof TokenExpiredError) {
    res = {
      status: responseStatus.UNAUTHORIZED,
      message: "Unauthorized! Access Token was expired!",
    };
    console.log("Unauthorized! Access Token was expired!");
    return res;
  }

  return res;
};

function verifyToken(token, id, socket) {
  if (!token) {
    var res = {
      status: responseStatus.UNAUTHORIZED,
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
        status: responseStatus.UNAUTHORIZED,
        message: "Unauthorized!",
      };
      console.log("Invalid token! Unauthorized!");
      return res;
    }

    return {
      status: responseStatus.SUCCESS,
      message: "SUCCESS",
    };
  });
}

module.exports = {
  verifyToken,
};
