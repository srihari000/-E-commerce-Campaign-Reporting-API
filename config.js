require('dotenv').config()
module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'randomsecretkey',
    jwtExpire: process.env.JWT_EXPIRES_IN || '1h',
    storage: process.env.STORAGE || './database/ecommerce.db',
    dialect: process.env.DB_DIALECT || 'sqlite',
    logging: process.env.LOGGING === 'false' ? false : true,
    port: process.env.PORT || 5000
};
