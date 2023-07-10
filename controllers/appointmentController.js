const auth = require('../middlewares/verifyToken');
const { Appointment, Service, User } = require('../models');
const appointmentController = {}

//CREATE APPOINTMENT FUNCTION
appointmentController.createAppointment = async (req, res) => {
    try {
        const { patient_id, dentist_id, service_id, date, hour } = req.body;
        // const userId = String(req.user_id);
        // // Check if the current user matches the provided patient_id
        // if (userId !== patient_id ) {
        //     return res.json({
        //         success: false,
        //         message: "You are not authorized to create an appointment for this patient",
        //     });
        // }
        
        // Checks if an appointment already exists for the current patient
        // const existingAppointment = await Appointment.findOne({
        //     where: {
        //         patient_id: patient_id
        //     }
        // });
        // if (existingAppointment) {
        //     return res.json({
        //         success: false,
        //         message: "An appointment already exists for this patient. Please delete the existing appointment before creating a new one.",
        //     });
        // }
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

        const appointment = await Appointment.findOne({
            where: {
                id: appointmentId,
                patient_id: userId
            }
        });
        // Verifica si el registro de la cita existe y si el usuario tiene el rol correcto
        if (!appointment) {
            return res.json({
                success: false,
                message: "Appointment not found or you don't have permission to upddate it",
            });
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
    } catch (error) {console.log(error.message)
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
        // Obtén el registro de la cita utilizando el ID de la cita y el ID del usuario
        const appointment = await Appointment.findOne({
            where: {
                id: appointmentId,
                patient_id: userId
            }
        });
        // Verifica si el registro de la cita existe y si el usuario tiene el rol correcto
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

        console.log("userid", req.user_id)

        const user = await User.findByPk(userId);

        if(user.role_id == 2) {
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
                message: "No se encontró una cita con ese ID.",
            });
        }

        return res.json({
            success: true,
            message: "Cita encontrada exitosamente.",
            data: appointment
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ 
            success: false,
            message: "No se pudo obtener la cita.",
            error: error.message
        });
    }
};

// patient name, date, doctor name.
appointmentController.searchBy = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findAll({where: {
            date: req.text, 
        }});

        if (!appointment) {
            return res.json({
                success: false,
                message: "No se encontró una cita con ese ID.",
            });
        }

        return res.json({
            success: true,
            message: "Cita encontrada exitosamente.",
            data: appointment
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "No se pudo obtener la cita.",
            error: error.message
        });
    }
};
module.exports = appointmentController;