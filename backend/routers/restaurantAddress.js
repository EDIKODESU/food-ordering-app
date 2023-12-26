const {Router} = require('express');
const path = require('node:path');
const router = new Router();
const restaurantAddressController = require("../controllers/restaurantAddress");

router.get('/', restaurantAddressController.getAll);

module.exports = router;