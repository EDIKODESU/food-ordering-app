const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// CREATE TABLE IF NOT EXISTS `order` (
//     id INT NOT NULL AUTO_INCREMENT,
//     isDelivery TINYINT NOT NULL,
//     deliveryAddress VARCHAR(100) NULL,
//     cutlery INT NOT NULL,
//     restorauntID INT,
//     clarificationByPhone TINYINT NOT NULL,
//     payment ENUM('Карта', 'Готівка') NOT NULL,
//     clientID INT NOT NULL,
//     timestamp DATE NOT NULL,
//     status ENUM('В обробці', 'Прийнято', 'Готується', 'Готово') NULL,
//     PRIMARY KEY (id),
//       FOREIGN KEY (clientID) REFERENCES client (id)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION)
//   ENGINE = InnoDB;

module.exports = function(sequelize, client, restaurantAddress) {    
    return  sequelize.define("order", {
        id: {
            type:  DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        isDelivery: {
            type:  DataTypes.TINYINT,
            allowNull: false
        },  
        deliveryAddress: {
            type: DataTypes.TEXT(100),
            allowNull: true
        }, 
        restaurantAddressId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: restaurantAddress,
                key: 'id'
            }
        }, 
        cutlery: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        clarificationByPhone: {
            type: DataTypes.TINYINT,
            allowNull: false
        }, 
        payment: {
            type: DataTypes.ENUM('Карта', 'Готівка'),
            allowNull: false
        },
        clientId: {
            type:  DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: client,
                key: 'id'
            }
        },
        timestamp: {
            type:  DataTypes.DATE,
            allowNull: false
        },
        status: {
            type:  DataTypes.ENUM('В обробці', 'Прийнято', 'Готується', 'Готово'),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'order',
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