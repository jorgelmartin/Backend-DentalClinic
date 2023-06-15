const { Appointment, User, Service } = require('../models');
const {role_id, user_id} = require('../models/user');
const jwt = require('jsonwebtoken');
const appointmentController = {}

appointmentController.createAppointment = async (req, res) => {
    try {


        const { patient_id, dentist_id, service_id, date, hour } = req.body;
        // patient_id:req.user_id,
        const newAppointment = await Appointment.create(
            {
                patient_id,
                dentist_id,
                service_id,
                date,
                hour
            }
        );

        return res.json(
            {
                success: true,
                message: "Appointment created",
                data: newAppointment
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cant be created",
                error: error.message
            }
        )
    }
};


appointmentController.updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.body.id;

        const appointment = await Appointment.findByPk(appointmentId);

        if (!appointment) {
            return res.json(
                {
                    success: true,
                    message: "Appointment doesnt exists"
                }
            );
        };

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
    } catch (error) {console.log(error,message)
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cant be updated",
                error: error.message
            }
        )
    }
}

appointmentController.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;

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
}

appointmentController.getAllAppointments = async (req, res) => {
    try {
        const appointment = await Appointment.findAll();

        return res.json(
            {
                success: true,
                message: "Get all appointment retrieved",
                data: appointment
            }
        )
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

module.exports = appointmentController;




//INCLUIR EL PRECIO DESDE EL SERVICE

// const price = await Service.findById(price);

//Service.price(En el create)

// return res.json(
//     {
//         success: true,
//         message: "Appointment created",
//         data: newAppointment,

//OJO
// price: price
// {
//     patient_id: newAppointment.patient_id,
//     service_id: newAppointment.service_id, 
//     date: newAppointment.date,
//     hour: newAppointment.date
// }