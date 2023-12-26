const { Sequelize, Model, DataTypes, Op } = require("sequelize");

// CREATE TABLE IF NOT EXISTS dish (
//     id INT NOT NULL AUTO_INCREMENT,
//     name VARCHAR(45) NOT NULL,
//     img VARCHAR(90) NOT NULL,
//     description TEXT(300) NOT NULL,
//     price INT NOT NULL,
//     category ENUM('Хот-доги', 'Піци', 'Сендвічі', 'Бургери', 'Шаурма', 'Супи') NOT NULL,
//     weight INT NOT NULL,
//     PRIMARY KEY (id))
//   ENGINE = InnoDB;

module.exports = function(sequelize) {    
    return  sequelize.define("dish", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        name: {
            type: DataTypes.TEXT(45),
            allowNull: false
        },  
        img: {
            type: DataTypes.TEXT(150),
            allowNull: false
        }, 
        description: {
            type: DataTypes.TEXT(300),
            allowNull: false
        },   
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },  
        category: {
            type: DataTypes.ENUM('Хот-доги', 'Піци', 'Сендвічі', 'Бургери', 'Шаурма', 'Супи'),
            allowNull: false,
            collate: "utf8mb4_general_ci"
        },  
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'dish',
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