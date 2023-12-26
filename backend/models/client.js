const { Sequelize, Model, DataTypes, Op } = require("sequelize");
// const {sequelize} = require("./db");

// CREATE TABLE IF NOT EXISTS Client (
//     id INT NOT NULL AUTO_INCREMENT,
//     firstName VARCHAR(45) NOT NULL,
//     lastName VARCHAR(45) NOT NULL,
//     phone VARCHAR(15) NOT NULL,
//     address VARCHAR(100) NOT NULL,
//     login VARCHAR(20) NOT NULL,
//     password VARCHAR(60) NOT NULL,
//     email VARCHAR(45) NOT NULL,
//     PRIMARY KEY (id))
//   ENGINE = InnoDB;

module.exports = function(sequelize) {    
    return  sequelize.define("client", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        firstName: {
            type:  DataTypes.TEXT(45),
            allowNull: false
        },  
        lastName: {
            type:  DataTypes.TEXT(45),
            allowNull: false
        }, 
        phone: {
            type:  DataTypes.TEXT(15),
            allowNull: false
        },   
        address: {
            type:  DataTypes.TEXT(100),
            allowNull: false
        },  
        login: {
            type:  DataTypes.TEXT(20),
            allowNull: false
        },  
        password: {
            type:  DataTypes.TEXT(60),
            allowNull: false
        },  
        email: {
            type:  DataTypes.TEXT(45),
            llowNull: false
        }
    }, {
        sequelize,
        tableName: 'client',
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
