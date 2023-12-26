const {Router} = require('express');
const path = require('node:path');
const router = new Router();
const dishController = require("../controllers/dish");

router.get('/', dishController.getAll);

module.exports = router;