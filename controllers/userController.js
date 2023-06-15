
const { User, Appointment, Service } = require("../models");

const userController = {};

//GET PROFILE 
userController.getUser = async (req, res) => {
    try {
        const userId = String(req.user_id);
        const { id } = req.params;
        //Verify user
        if (id !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to get this profile",
            });
        }
        const user = await User.findByPk(id, {
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

//UPDATE USER
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
                error: error.message
            }
        )
    }
}

//DELETE USER
userController.deleteUser = async (req, res) => {
    try {
        const userId = String(req.user_id);
        const { id } = req.params;
        // Verify user
        if (id !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this user",
            });
        }
        const deletedUser = await User.destroy({
            where: {
                id: id
            }
        });
        if (deletedUser === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message,
        });
    }
};

//GET ALL THE USERS
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
//GET ALL APPOINTMENTS BY USER
userController.getAllAppointmentsByUser = async (req, res) => {
    try {
        const userId = String(req.user_id);
        const { id } = req.params;
        //Verify user
        if (id !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to get this profile",
            });
        }
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