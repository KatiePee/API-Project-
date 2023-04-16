//backend/config/index.js
module.exports = {
    enviornment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile:process.env.DB_FILE,
    jwtConfig: {
        secret: process.env.JWT_SECRET, 
        expiresIn: process.env.JWT_EXPIRES_IN
    }
};

//this config file pretty much just configured all of the enviornment variables and set some default env variables if none were provided
