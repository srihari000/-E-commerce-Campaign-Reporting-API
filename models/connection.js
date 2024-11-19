const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage,
    logging: config.logging
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to SQLite has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;