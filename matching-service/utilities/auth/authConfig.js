const authConfig = {
    secret: process.env.SECRET_AUTH_KEY,
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hour
}

module.exports= { authConfig };