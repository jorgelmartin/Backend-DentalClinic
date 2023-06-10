const { Appoiment } = require('../models');
const appoimentController = {}

appoimentController.createAppoiment = async(req, res) => {
    try {
        
        const { user_id,doctor_id,treatment_id,date,hour } = req.body;


        const newAppoiment = await Appoiment.create(
            {
                user_id,
                doctor_id,
                treatment_id,
                date,
                hour
            }
        );

        return res.json(
            {
                success: true,
                message: "Appoiment created",
                data: newAppoiment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appoiment cant be created",
                error: error.message
            }
        )
    }
}
appoimentController.updateAppoiment = async(req, res) => {
    try {
        const appoimentId = req.params.id;

        const appoiment = await Appoiment.findByPk(appoimentId);

        if (!appoiment) {
            return res.json(
                {
                    success: true,
                    message: "Appoiment doesnt exists"
                }
            );
        };

        const { user_id,doctor_id,treatment_id,date,hour } = req.body;

        const appoimentUpdated = await Appoiment.update(
            {
                user_id,
                doctor_id,
                treatment_id,
                date,
                hour
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
                message: "Appoiment updated",
                data: appoimentUpdated
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appoiment cant be updated",
                error: error
            }
        )
    }
}

appoimentController.deleteAppoiment = async(req, res) => {
    try {
        const appoimentId = req.params.id;

        const deleteAppoiment = await Appoiment.destroy({
            where: {
                id: appoimentId
            }
        })

        return res.json(
            {
                success: true,
                message: "Appoiment deleted successfully",
                data: deleteAppoiment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appoiment cant be deleted",
                error: error.message
            }
        )
    }
}

appoimentController.getAllAppoiments = async(req, res) => {
    try {
        const appoiment = await Appoiment.findAll();

        return res.json(
            {
                success: true,
                message: "Get all appoiment retrieved",
                data: appoiment
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appoiment cant be retrieved",
                error: error.message
            }
        )
    }
}

module.exports = appoimentController;