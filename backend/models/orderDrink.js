const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// CREATE TABLE IF NOT EXISTS orderDrink (
//     orderID INT NOT NULL,
//     drinkID INT NOT NULL,
//     count INT NOT NULL,
//       FOREIGN KEY (drinkID) REFERENCES drink (id)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION,
//       FOREIGN KEY (orderID) REFERENCES `order` (id)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION)
//   ENGINE = InnoDB;

module.exports = function(sequelize, order, drink) {    
    return  sequelize.define("orderDrink", {
        orderId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: order,
                key: 'id'
            }
        },
        drinkId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: drink,
                key: 'id'
            }
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'orderDrink',
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