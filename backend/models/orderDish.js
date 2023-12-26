const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// CREATE TABLE IF NOT EXISTS orderDish (
//     orderID INT NOT NULL,
//     dishID INT NOT NULL,
//     count INT NOT NULL,
//       FOREIGN KEY (dishID) REFERENCES dish (id)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION,
//       FOREIGN KEY (orderID) REFERENCES `order` (id)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION)
//   ENGINE = InnoDB;

module.exports = function(sequelize, order, dish) {    
    return  sequelize.define("orderDish", {
        orderId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: order,
                key: 'id'
            }
        },
        dishId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: dish,
                key: 'id'
            }
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'orderDish',
        // schema: 'public',
        timestamps: false,
        // indexes: [
        //   {
        //     name: "users_pkey",
        //     unique: true,
        //     fields: [
        //       { name: "id" },
        //     ]
        //   },
        // ]
    });
};