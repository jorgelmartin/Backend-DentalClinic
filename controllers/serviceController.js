const { Service } = require("../models");
const { QueryTypes } = require('sequelize');



const serviceController = {};

serviceController.createService = async(req, res) => {
    try {
        const { name,price,duration } = req.body;

        //validaciones

        const newService = await Service.create(
            {
                name,
                price,
                duration
            }
        );
        
        return res.json({
            success: true,
            message: "Service created",
            data: newService
        });       
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Service cant be created",
                error: error
            }
        )
    }
}

serviceController.updateService = async(req, res) => {
    try {
        const serviceId = req.params.id;

        const service = await Service.findByPk(serviceId);

        if (!service) {
            return res.json(
                {
                    success: true,
                    message: "Service doesnt exists"
                }
            );
        };

        const { name,price,duration } = req.body;

        const serviceUpdated = await Service.update(
            {
                name,
                price,
                duration
            },
            {
                where: {
                    id: serviceId
                }
            }
        )

        return res.json(
            {
                success: true,
                message: "Service updated",
                data: serviceUpdated
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Service cant be updated",
                error: error
            }
        )
    }
}

serviceController.deleteService = async(req, res) => {
    try {
        const serviceId = req.params.id;

        const deleteService = await Service.destroy({
            where: {
                id: serviceId
            }
        })
        return res.json(
            {
                success: true,
                message: "Service deleted successfully",
                data: deleteService
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Service cant be deleted",
                error: error.message
            }
        )
    }
}

serviceController.getAllServices = async(req, res) => {
    try {
        const service = await Service.findAll();
        return res.json(
            {
                success: true,
                message: "Get all service retrieved",
                data: service
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Service cant be retrieved",
                error: error.message
            }
        )
    }
}

module.exports = serviceController;