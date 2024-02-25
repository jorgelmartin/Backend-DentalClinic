const auth = require('../middlewares/verifyToken');
const { Appointment, Service, User } = require('../models');
const appointmentController = {}

//CREATE APPOINTMENT FUNCTION
appointmentController.createAppointment = async (req, res) => {
    try {
        const { patient_id, dentist_id, service_id, date, hour } = req.body;
        const newAppointment = await Appointment.create({
            patient_id,
            dentist_id,
            service_id,
            date,
            hour
        });
        return res.json({
            success: true,
            message: "Appointment created",
            data: newAppointment
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Appointment could not be created",
            error: error.message
        });
    }
};

//UPDATE APPOINTMENT FUNCTION
appointmentController.updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const userId = req.user_id;
        const userRoleId = req.role_id;

        // IF TH USER IS ADMIN CAN EDIT
        if (userRoleId === 2) {

        } else {
              // VERIFY PATIENT
            const appointment = await Appointment.findOne({
                where: {
                    id: appointmentId,
                    patient_id: userId
                }
            });
            if (!appointment) {
                return res.json({
                    success: false,
                    message: "Appointment not found or you don't have permission to update it",
                });
            }
        }
        const { patient_id, dentist_id, service_id, date, hour } = req.body;
        const appointmentUpdated = await Appointment.update(
            {
                patient_id,
                dentist_id,
                service_id,
                date,
                hour
            },
            {
                where: {
                    id: appointmentId
                }
            }
        )
        return res.json(
            {
                success: true,
                message: "Appointment updated",
                data: appointmentUpdated
            }
        );
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cant be updated",
                error: error.message
            }
        )
    }
};

//DELETE APPOINTMENT FUNCTION
appointmentController.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const userId = req.user_id;
        const appointment = await Appointment.findOne({
            where: {
                id: appointmentId,
                patient_id: userId
            }
        });
        if (!appointment) {
            return res.json({
                success: false,
                message: "Appointment not found or you don't have permission to delete it",
            });
        }
        const deleteAppointment = await Appointment.destroy({
            where: {
                id: appointmentId
            }
        })
        return res.json(
            {
                success: true,
                message: "Appointment deleted successfully",
                data: deleteAppointment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cant be deleted",
                error: error.message
            }
        )
    }
};

//GET ALL APPOINTMENT FUNCTION
appointmentController.getAllAppointments = async (req, res) => {
    try {
        const userId = req.user_id;
        const user = await User.findByPk(userId);

        if (user.role_id == 2) {
            const appointment = await Appointment.findAll({
                include: [
                    {
                        model: Service,
                        attributes: ['price', 'name'],
                    },
                    {
                        model: User,
                        as: "patient",
                        attributes: ['name', 'lastname'],
                    },
                    {
                        model: User,
                        as: "dentist",
                        attributes: ['name', 'lastname'],
                    },
                ],
            });

            return res.json(
                {
                    success: true,
                    message: "Get all appointment retrieved",
                    data: appointment
                }
            )

        } else {
            const appointment = await Appointment.findAll({
                where: { patient_id: user.id },
                include: [
                    {
                        model: Service,
                        attributes: ['price', 'name'],
                    },
                    {
                        model: User,
                        as: "patient",
                        attributes: ['name', 'lastname'],
                    },
                    {
                        model: User,
                        as: "dentist",
                        attributes: ['name', 'lastname'],
                    },
                ],
            });

            return res.json(
                {
                    success: true,
                    message: "Get all appointment retrieved",
                    data: appointment
                }
            )
        }

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cant be retrieved",
                error: error.message
            }
        )
    }
}

appointmentController.getById = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.json({
                success: false,
                message: "Appointment not found with the ID",
            });
        }

        return res.json({
            success: true,
            message: "Appointment found successfully",
            data: appointment
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Appointment cant be retrieved",
            error: error.message
        });
    }
};
module.exports = appointmentController;
