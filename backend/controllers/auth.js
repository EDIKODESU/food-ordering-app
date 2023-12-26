const path = require('node:path');
const {client} = require("../models/db");
const { Op } = require("sequelize");
const {generateAccessToken} = require("../utils/jwt");
const {hashPassword, checkPassword} = require("../utils/hash");
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    try {
        let data = req.body;
        if ((!data.login || data.login.length > 20 || data.login.length < 4)
        || (!data.password || data.password.length > 25 || data.password.length < 8)
        || (!data.email || data.email.length > 45 || data.email.length < 7)
        || (!data.firstName || data.firstName.length > 45 || data.firstName.length < 2)
        || (!data.lastName || data.lastName.length > 45 || data.lastName.length < 2)
        || (!data.phone || data.phone.length != 14 || data.phone.length > 15)
        || (!data.address || data.address.length < 10 || data.address.length > 100))
        {
            res.status(400).send(); 
            return;
        }
        let hashPass = hashPassword(data.password);
        const [createdClient, isClientCreated] = await client.findOrCreate({
            where: {
                [Op.or]: [
                    { login : data.login },
                    { email : data.email },
                ],
            },
            defaults: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                address: data.address,
                login: data.login,
                password: hashPass,
                email: data.email
            }
        });
        if(!isClientCreated)
        {
            res.status(409).send(); 
            return;
        }
        res.json(createdClient);
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}

const login = async (req, res) => {
    try {
        let data = req.body;
        if ((!data.login || data.login.length > 20 || data.login.length < 4)
        || (!data.password || data.password.length > 25 || data.password.length < 8))
        {
            res.status(400).send(); 
            return;
        }

        const findClient = await client.findOne({
            where: {
                login: data.login
            }
        });

        if (!findClient || !checkPassword(data.password, findClient.password)){
            res.status(401).send();
            return;
        }
        let token = generateAccessToken(findClient.id, findClient.login, findClient.email);
        res.cookie("access_token", token);
        res.json(findClient);
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}

const getMe = async(req, res) => {
    try {
        const findClient = await client.findByPk(req.user.id, {
            attributes: ["login", "firstName", "lastName", "address", "email", "phone"]
        });
        if (!findClient) {
            req.status(StatusCodes.UNAUTHORIZED).send();
            return;
        }
        res.status(StatusCodes.OK).json(findClient);
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}

const logout = (req, res) => {
    try {
        res.cookie("access_token", "").send();
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}
module.exports = {register, login, getMe, logout};