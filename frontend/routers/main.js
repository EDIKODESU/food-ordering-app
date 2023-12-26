const {Router} = require('express');
const router = new Router();
const mainController = require("../controllers/main");

router.get('/', mainController.getMenu);

module.exports = router;