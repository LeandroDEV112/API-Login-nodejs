const express = require('express');
const Router = express.Router();

const UserController = require('../controller/UserController');

Router.post('/create', require('../middlewares/validateCreate') ,UserController.save);
Router.post('/login', require('../middlewares/validateMailAndPass'),UserController.login);
Router.get('/home', require('../middlewares/auth') ,UserController.home);
Router.post('/passwordForgot', UserController.forgotPassword);
Router.post('/passwordReset', require('../middlewares/validateMailAndPass'),UserController.resetPassword);

module.exports = Router;