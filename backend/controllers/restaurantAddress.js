const {restaurantAddress} = require("../models/db");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
    try {
        const addresses = await restaurantAddress.findAll();
        res.json({addresses});
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}

module.exports = {getAll};