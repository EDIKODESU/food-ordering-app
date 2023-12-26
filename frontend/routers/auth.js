const {Router} = require('express');
const router = new Router();
const authController = require("../controllers/auth");

router.get('/sign-up', authController.register);

module.exports = router;