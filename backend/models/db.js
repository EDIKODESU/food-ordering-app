const { Sequelize } = require("sequelize");
const config = require("../config.json");

const clientModel = require("./client");
const dishModel = require("./dish");
const drinkModel = require("./drink");
const orderModel = require("./order");
const orderDishModel = require("./orderDish");
const orderDrinkModel = require("./orderDrink");
const restaurantAddressModel = require("./restaurantAddress");

const sequelize = new Sequelize(config.database, config.dbUser, config.dbPassword, {
    dialect: 'mysql',
    define: {
      collate: "utf8mb4_general_ci"
    }
});

let client = clientModel(sequelize);
let dish = dishModel(sequelize);
let drink = drinkModel(sequelize);
let restaurantAddress = restaurantAddressModel(sequelize);
let order = orderModel(sequelize, client, restaurantAddress);
let orderDrink = orderDrinkModel(sequelize, order, drink);
let orderDish = orderDishModel(sequelize, order, dish);

restaurantAddress.hasMany(order);
order.belongsTo(restaurantAddress);

client.hasMany(order);
order.belongsTo(client);

order.belongsToMany(drink, { through: orderDrink });
drink.belongsToMany(order, { through: orderDrink });

order.belongsToMany(dish, { through: orderDish });
dish.belongsToMany(order, { through: orderDish });

module.exports = {sequelize, client, dish, drink, order, orderDrink, orderDish, restaurantAddress};
