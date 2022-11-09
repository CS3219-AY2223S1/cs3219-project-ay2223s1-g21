import jwt from 'jsonwebtoken';
import authConfig from '../config/auth-config.js';

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.status(401).send({ message: "Unauthorized!" });
}

export async function verifyToken(req, res, next) {
    const token = req.headers["access-token"];
    let { id } = req.body;
    if (!id) {
        id = req.query.id
    }

    if (id == null) {
        return res.status(403).send({ message: "No user id provided!" });
    }

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        if (id != decoded.id) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        next();
  });
};
