const {order, drink, dish, orderDish, orderDrink, restaurantAddress, client} = require("../models/db");
const { Op } = require("sequelize");

// isDelivery TINYINT NOT NULL,
//     deliveryAddress VARCHAR(100) NULL,
//     cutlery INT NOT NULL,
//     clarificationByPhone TINYINT NOT NULL,
//     restorauntID INT,
//     payment ENUM('Карта', 'Готівка') NOT NULL,
//     clientID INT NOT NULL,
//     timestamp DATE NOT NULL,
//     status ENUM('В обробці', 'Прийнято', 'Готується', 'Готово') NULL,
// dish: [{id, count}]
// clientID: id

const createOrder = async (req, res) => {
    try {
        const data = req.body;
        const newDate = new Date().getTime();
        const createdOrder = await order.create({
            isDelivery: data.isDelivery,
            deliveryAddress: data.address,
            restaurantAddressId: data.restaurantAddressId,
            cutlery: data.cutlery,
            clarificationByPhone: data.clarificationByPhone,
            payment: data.payment,
            clientId: req.user.id,
            timestamp: newDate,
            status: "В обробці"
        });
        data.dishes.map(async (dish) => {
            await orderDish.create({
                orderId: createdOrder.id,
                dishId: dish.id,
                count: dish.count
            });
        });
        data.drinks.map(async (drink) => {
            await orderDrink.create({
                orderId: createdOrder.id,
                drinkId: drink.id,
                count: drink.count
            });
        });
        res.status(200).json({orderId: createdOrder.id});
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}

// /api/order/:id
const getOrder = async (req, res) => {
    try {
        const orderData = await order.findAll({ 
            where: { id: req.params.id },
            include: [{
                model: client,
                required: true,
                where: {
                    id: req.user.id
                }
            },
            {
                model: dish,
                required: false
            },
            {
                model: drink,
                required: false
            },
            {
                model: restaurantAddress,
                required: false
            }
        ]});
        console.log(orderData, req.params.id);
        res.json({order: orderData});
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}

const getOrders = async (req, res) => {
    try {
        const orderData = await order.findAll({
            include: [{
                model: client,
                required: true,
                where: {
                    id: req.user.id
                }
            },
            {
                model: dish,
                required: false
            },
            {
                model: drink,
                required: false
            },
            {
                model: restaurantAddress,
                required: false
            }]
        });
        res.json({order: orderData});
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}

module.exports = {createOrder, getOrder, getOrders};
