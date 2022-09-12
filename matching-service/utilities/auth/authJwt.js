const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig.js');
const responseStatus = require('../constants/ResponseStatus');
const { TokenExpiredError } = jwt;

const catchError = (err, socket) => {
    if (err instanceof TokenExpiredError) {
        var res = { 
            status: responseStatus.BAD_REQUEST, 
            message: "Unauthorized! Access Token was expired!"
        };
        console.log("Unauthorized! Access Token was expired!")
        socket.emit('matchFailed', res)
        return res;
    }

    var res = { 
        status: responseStatus.BAD_REQUEST, 
        message: "Unauthorized!"
    };
    console.log("Unauthorized!")
    socket.emit('matchFailed', res)
    return res;
}

async function verifyToken(token, id, socket) {
    if (!token) {
        var res = { 
            status: responseStatus.BAD_REQUEST, 
            message: "No user id provided!"
        };
        console.log('No user id provided')
        socket.emit('matchFailed', res)
        return res
    }

    if (!token) {
        var res = { 
            status: responseStatus.BAD_REQUEST, 
            message: "No token provided!"
        };
        console.log('No token provided')
        socket.emit('matchFailed', res)
        return res
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return catchError(err, socket);
        }
        if (id != decoded.id) {
            var res = { 
                status: responseStatus.BAD_REQUEST, 
                message: "Unauthorized!"
            };
            console.log("Unauthorized!")
            socket.emit('matchFailed', res)
            return res;
        }
        return "ok";
  });
};