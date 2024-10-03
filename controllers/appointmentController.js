
const { Appointment, Service, User } = require('../models');
const { 
    getPagination, 
    searchAppointmentCriteria, 
    isValidField } = require('../service/useful');
const { 
    isDoctorAvailable, 
    isPatientAvailable, 
    findAppointment, 
    validateAppointmentDate} = require('../service/validateAppointment');
const appointmentController = {}

//CREATE APPOINTMENT
appointmentController.createAppointment = async (req, res) => {
    try {
        const { patient_id, dentist_id, service_id, date, hour } = req.body;

        // Validate that the appointment date is valid
        isValidField(date, (d) => validateAppointmentDate(d, hour, "Invalid appointment date."));

        // Validate that there are no duplicate appointments for the doctor
        const isDoctorFree = await isDoctorAvailable(Appointment, dentist_id, date, hour);
        if (!isDoctorFree) {
            throw new Error("The doctor is already booked at this time.");
        }

        // Validate that there are no duplicate appointments for the patient
        const isPatientFree = await isPatientAvailable(Appointment, patient_id, date, hour);
        if (!isPatientFree) {
            throw new Error("The patient already has an appointment at this time.");
        }

        const newAppointment = await Appointment.create({
            patient_id,
            dentist_id,
            service_id,
            date,
            hour
        });
        return res.status(200).json({
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

// UPDATE APPOINTMENT
appointmentController.updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const { dentist_id, service_id, date, hour } = req.body;
        const updateData = {};

        // Validations
        if (date) {
            isValidField(date, (d) => validateAppointmentDate(d, hour, "Invalid appointment date."));
            updateData.date = date;
        }

        if (dentist_id) {
            const isDoctorFree = await isDoctorAvailable(Appointment, dentist_id, date, hour);
            if (!isDoctorFree) {
                throw new Error("The doctor is already booked at this time.");
            }
            updateData.dentist_id = dentist_id; 
        }

        if (service_id) {
            updateData.service_id = service_id;
        }

        const appointmentUpdated = await Appointment.update(updateData, {
            where: {
                id: appointmentId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Appointment updated",
            data: appointmentUpdated
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Appointment can't be updated",
            error: error.message
        });
    }
};

// SEARCH APPOINTMENTS FUNCTION
appointmentController.searchAppointments = async (req, res) => {
    try {
        const userId = req.user_id;
        const user = await User.findByPk(userId);

        const whereCondition = searchAppointmentCriteria(user, req.query.query);

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 6;
        const { limit, offset } = getPagination(page, perPage);

        const { count, rows } = await Appointment.findAndCountAll({
            where: whereCondition,
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
            limit: limit,
            offset: offset,
        });

        const totalPages = Math.ceil(count / perPage);

        return res.status(200).json({
            success: true,
            message: "Appointments retrieved",
            data: rows,
            pagination: {
                totalItems: count,
                currentPage: page,
                totalPages: totalPages,
                perPage: perPage,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Appointments could not be retrieved",
            error: error.message
        });
    }
};

//GET APPOINTMENT BY ID
appointmentController.getAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.id;

        const appointment = await Appointment.findByPk(appointmentId, {
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

        return res.status(200).json({
            success: true,
            message: "Appointment retrieved successfully",
            data: appointment,
        });

    } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        return res.status(500).json({
            success: false,
            message: "Appointment could not be retrieved",
            error: error.message,
        });
    }
};

//GET HOURS
appointmentController.getHours = async (req, res) => {
    try {
        const hours = [
            { "id": 1, "hour": "09:00:00" },
            { "id": 2, "hour": "09:30:00" },
            { "id": 3, "hour": "10:30:00" },
            { "id": 4, "hour": "12:00:00" },
            { "id": 5, "hour": "14:30:00" },
            { "id": 6, "hour": "16:00:00" }
        ];

        return res.status(200).json({
            success: true,
            message: "Hours retrieved",
            data: hours
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Hours could not be retrieved",
            error: error.message
        });
    }
};

//DELETE APPOINTMENT
appointmentController.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const userId = req.user_id;
        const deleteResult = await Appointment.destroy({
            where: {
                id: appointmentId,
                patient_id: userId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
            data: deleteResult
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Appointment can't be deleted",
            error: error.message
        });
    }
};

module.exports = appointmentController;