const sequelize = require('sequelize');
const connection = new sequelize('users', 'leandro', 'slimshady', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;