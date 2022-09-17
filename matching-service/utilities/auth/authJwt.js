const jwt = require('jsonwebtoken');
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

function verifyToken(token, id, socket) {
    if (!token) {
        var res = { 
            status: responseStatus.BAD_REQUEST, 
            message: "No user id provided! Unauthorized!"
        };
        console.log('No user id provided')
        socket.emit('matchFailed', res)
        return res
    }

    if (!token) {
        var res = { 
            status: responseStatus.BAD_REQUEST, 
            message: "No token provided! Unauthorized!"
        };
        console.log('No token provided')
        socket.emit('matchFailed', res)
        return res
    }

    var verifyRes = jwt.verify(token, process.env.SECRET_AUTH_KEY, (err, decoded) => {
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
        } else {
          var res = { 
            status: responseStatus.SUCCESS, 
            message: "SUCCESS"
          };
          return res;
        }
    });

    return verifyRes
};

module.exports = {
    verifyToken,
};
