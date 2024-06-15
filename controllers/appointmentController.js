const { Op } = require('sequelize');
const { Appointment, Service, User } = require('../models');
const appointmentController = {}

//CREATE APPOINTMENT
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

//UPDATE APPOINTMENT
appointmentController.updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const userId = req.user_id;
        const userRoleId = req.role_id;
        let appointment;

        if (userRoleId === 2) {
            appointment = await Appointment.findOne({
                where: {
                    id: appointmentId
                }
            });
        } else {
            appointment = await Appointment.findOne({
                where: {
                    id: appointmentId,
                    patient_id: userId
                }
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
        return res.status(200).json(
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

// GET ALL APPOINTMENT
appointmentController.getAllAppointments = async (req, res) => {
    try {
        const userId = req.user_id;
        const user = await User.findByPk(userId);

        let whereCondition = {};
        if (user.role_id !== 2) {
            whereCondition = { patient_id: user.id };
        }

        // Get the pagination parameters of the request
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 6;

        // Calculate the offset for the query
        const offset = (page - 1) * perPage;

        // Get appointments with pagination
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
            limit: perPage,
            offset: offset,
        });

        // Calculate total pages
        const totalPages = Math.ceil(count / perPage);

        return res.status(200).json({
            success: true,
            message: "All appointments retrieved",
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

// SEARCH APPOINTMENTS FUNCTION
appointmentController.searchAppointments = async (req, res) => {
    try {
        const userId = req.user_id;
        const user = await User.findByPk(userId);

        let whereCondition = {};
        if (user.role_id !== 2) {
            whereCondition = { patient_id: user.id };
        }

        // Get the pagination parameters of the request
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 6;

        // Calculate the offset for the query
        const offset = (page - 1) * perPage;

        // Add search functionality
        const searchQuery = req.query.query;
        if (searchQuery) {
            whereCondition[Op.or] = [
                { '$Service.name$': { [Op.like]: `%${searchQuery}%` } },
                { '$Service.price$': { [Op.like]: `%${searchQuery}%` } },
                { '$patient.name$': { [Op.like]: `%${searchQuery}%` } },
                { '$patient.lastname$': { [Op.like]: `%${searchQuery}%` } },
                { '$dentist.name$': { [Op.like]: `%${searchQuery}%` } },
                { '$dentist.lastname$': { [Op.like]: `%${searchQuery}%` } }
            ];
        }

        // Get appointments with pagination
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
            limit: perPage,
            offset: offset,
        });

        // Calculate total pages
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
            message: "All hours retrieved",
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