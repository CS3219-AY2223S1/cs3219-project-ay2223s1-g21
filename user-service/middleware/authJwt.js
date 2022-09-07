import jwt from "jsonwebtoken";
import config from "../config/auth-config.js";

export async function verifyToken(req, res, next) {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "Token not provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
