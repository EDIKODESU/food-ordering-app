const {Router} = require('express');
const path = require('node:path');
const router = new Router();
const orderController = require("../controllers/order");
const {jwtMiddleware} = require("../utils/jwt");

router.post('/', jwtMiddleware, orderController.createOrder);
router.get('/all', jwtMiddleware, orderController.getOrders);
router.get('/:id', jwtMiddleware, orderController.getOrder);


module.exports = router;