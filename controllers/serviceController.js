const { Service } = require("../models");
const serviceController = {};

//GET ALL SERVICE/TREATMENT
serviceController.getAllServices = async (req, res) => {
    try {
        const service = await Service.findAll({
            attributes: {
                exclude: ['duration', 'updatedAt', 'createdAt'],
            }
        });
        return res.status(200).json({
            success: true,
            message: "Get all service retrieved",
            data: service
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Service cant be retrieved",
            error: error.message
        });
    }
};

module.exports = serviceController;