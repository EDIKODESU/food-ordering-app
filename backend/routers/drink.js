const {Router} = require('express');
const path = require('node:path');
const router = new Router();
const drinkController = require("../controllers/drink");

router.get('/', drinkController.getAll);

module.exports = router;