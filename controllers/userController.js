const { log } = require("console");
const { User, Appointment, Service } = require("../models");
const { QueryTypes } = require('sequelize');
// const jwt = require('jsonwebtoken');

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { fullname, email, password, nif, role_id, direction, age, phone } = req.body;

        //validaciones

        const newUser = await User.create(
            {
                fullname,
                email,
                password,
                nif,
                role_id,
                direction,
                age,
                phone
            }
        );

        return res.json({
            success: true,
            message: "User created",
            data: newUser
        });
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cant be created",
                error: error
            }
        )
    }
};

userController.getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt', 'role_id'],
            },
        });


        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to get user',
            error: error.message,
        });
    }
};

userController.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.json(
                {
                    success: true,
                    message: "User doesnt exists"
                }
            );
        };

        const { fullname, email, password, nif, direction, age, phone } = req.body;

        const userUpdated = await User.update(
            {
                fullname,
                email,
                password,
                nif,
                direction,
                age,
                phone
            },
            {
                where: {
                    id: userId
                }
            }
        )

        return res.json(
            {
                success: true,
                message: "User updated",
                data: userUpdated
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cant be updated",
                error: error
            }
        )
    }
}

userController.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deleteUser = await User.destroy({
            where: {
                id: userId
            }
        })

        return res.json(
            {
                success: true,
                message: "User deleted successfully",
                data: deleteUser
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cant be deleted",
                error: error
            }
        )
    }
}

userController.getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll();

        return res.json(
            {
                success: true,
                message: "Get all users retrieved",
                data: user
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cant be retrieved",
                error: error.message
            }
        )
    }
};

userController.getAllAppointmentsByUser = async (req, res) => {
    try {
        const userAppointment = await Appointment.findAll({
            where: {
                patient_id: req.params.id,
            },
            include: [
                {
                    model: Service,
                    attributes: ['price'],
                },
            ],
        });
        return res.json(userAppointment);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = userController;