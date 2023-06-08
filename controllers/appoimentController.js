const { Appoiment } = require('../models');
const appoimentController = {}

appoimentController.createAppoiment = async(req, res) => {
    try {
        
        const { treatment_id,user_id,date,hour } = req.body;


        const newAppoiment = await Appoiment.create(
            {
                treatment_id,
                user_id,
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

module.exports = appoimentController;