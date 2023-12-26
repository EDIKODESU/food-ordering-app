const {Router} = require('express');
const path = require('node:path');
const router = new Router();
const authController = require("../controllers/auth");
const { jwtMiddleware } = require('../utils/jwt');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', jwtMiddleware, authController.getMe);
router.get('/logout', jwtMiddleware, authController.logout);

module.exports = router;