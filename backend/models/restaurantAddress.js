const { Sequelize, Model, DataTypes, Op } = require("sequelize");
// const {sequelize} = require("./db");

// CREATE TABLE IF NOT EXISTS restaurantAddress (
//     id INT NOT NULL AUTO_INCREMENT,
//     address VARCHAR(100) NULL,
//      PRIMARY KEY (id))
//   ENGINE = InnoDB;

module.exports = function(sequelize) {    
    return  sequelize.define("restaurantAddress", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        address: {
            type:  DataTypes.TEXT(100),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'restaurantAddress',
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
