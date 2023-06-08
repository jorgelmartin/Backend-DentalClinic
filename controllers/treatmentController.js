const { Treatment } = require("../models");
const { QueryTypes } = require('sequelize');


const treatmentController = {};

treatmentController.createTreatment = async(req, res) => {
    try {
        const { name,price,description,duration } = req.body;

        //validaciones

        const newTreatment = await Treatment.create(
            {
                name,
                price,
                description,
                duration
            }
        );
        
        return res.json({
            success: true,
            message: "Treatment created",
            data: newTreatment
        });       
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Treatment cant be created",
                error: error
            }
        )
    }
}

treatmentController.updateTreatment = async(req, res) => {
    try {
        const treatmentId = req.params.id;

        const treatment = await Treatment.findByPk(treatmentId);

        if (!treatment) {
            return res.json(
                {
                    success: true,
                    message: "Treatment doesnt exists"
                }
            );
        };

        const { name,price,description,duration } = req.body;

        const treatmentUpdated = await Treatment.update(
            {
                name,
                price,
                description,
                duration
            },
            {
                where: {
                    id: treatmentId
                }
            }
        )

        return res.json(
            {
                success: true,
                message: "Treatment updated",
                data: treatmentUpdated
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Treatment cant be updated",
                error: error
            }
        )
    }
}

treatmentController.deleteTreatment = async(req, res) => {
    try {
        const treatmentId = req.params.id;

        const deleteTreatment = await Treatment.destroy({
            where: {
                id: treatmentId
            }
        })

        return res.json(
            {
                success: true,
                message: "Treatment deleted successfully",
                data: deleteTreatment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Treatment cant be deleted",
                error: error.message
            }
        )
    }
}

treatmentController.getAllTreatments = async(req, res) => {
    try {
        const treatment = await Treatment.findAll();

        return res.json(
            {
                success: true,
                message: "Get all treatment retrieved",
                data: treatment
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Treatment cant be retrieved",
                error: error.message
            }
        )
    }
}

module.exports = treatmentController;