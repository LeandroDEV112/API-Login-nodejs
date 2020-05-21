const sequelize = require('sequelize');
const connection = require('../../config/database');

const User = connection.define('user', {

    name: {
        type: sequelize.STRING,
        allowNull: false
    },

    email: {
        type: sequelize.STRING,
        allowNull: false
    },

    password: {
        type: sequelize.STRING,
        allowNull: false
    },

    passwordResetToken: {
        type: sequelize.STRING,
        allowNull: false,
    },

    passwordResetExpires: {
        type: sequelize.DATE,
        allowNull: false
    },

});

module.exports = User;