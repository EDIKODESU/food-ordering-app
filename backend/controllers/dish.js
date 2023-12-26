const { StatusCodes } = require("http-status-codes");
const {dish} = require("../models/db");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
    try { 
        let categories = req.query.categories && req.query.categories.split(',');
        let searchTerm = req.query.seachValueOrder;
        const dishes = await dish.findAll({ order: [
            ['category', 'ASC'],
            ...(req.query.priceOrder ? [['price', req.query.priceOrder]] : [])
        ], 
        ...(categories || searchTerm ? { where: {
            [Op.and]: [
                (categories ? {
                    category: {
                    [Op.in]: categories
                    }
                } : {}),
                (searchTerm ? {
                    name: {
                    [Op.substring]: searchTerm
                    }
                } : {})
            ]
        } } : {})});
        res.json({dishes}); 
    }
    catch(error) {
        console.log("Some error while creating event: ", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json ({
            error : "Some error while creating event: " + error.message
        });
    }
}
module.exports = {getAll};