
const { User, Appointment, Service } = require("../models");
const models = require('../models/index');
const bcrypt = require('bcrypt');
const userController = {};

//GET PROFILE 
userController.getUser = async (req, res) => {
    try {
        // const userId = String(req.user_id);
        // const { id } = req.params;
        // //Verify user
        // if (id !== userId) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "You are not authorized to get this profile",
        //     });
        // }
        const user = await User.findByPk(req.user_id, {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'role_id'],
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
        const userId = req.user_id;
        // const user = await User.findByPk(userId);
        // if (!user) {
        //     return res.json(
        //         {
        //             success: true,
        //             message: "User doesnt exists"
        //         }
        //     );
        // };

        const newPassword = bcrypt.hashSync(req.body.password, 8);
        const { name, lastname, email, password, dni, address, age, phone } = req.body;
        const userUpdated = await User.update(
            {
                name,
                lastname,
                email,
                password: newPassword,
                dni,
                address,
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
        const user = await User.findAll({
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt'],
            },
        });
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
// userController.getAllAppointmentsByUser = async (req, res) => {
//     try {
//         // const userId = String(req.user_id);
//         // const { id } = req.params;
//         // //Verify user
//         // if (id !== userId) {
//         //     return res.status(403).json({
//         //         success: false,
//         //         message: "You are not authorized to get this profile",
//         //     });
//         // }
//         const userAppointment = await Appointment.findAll({
//             where: {
//                 patient_id: req.user_id
//             },
//             include: [
//                 {
//                     model: Service,
//                     attributes: ['price'],
//                 },
//             ],
//         });console.log(patient_id);
//         return res.json(userAppointment);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

userController.getAllAppointmentsByUser = async (req, res) => {
const user = await models.User.findByPk(req.user_id);

    if(user && user.role_id === 3) {
        let resp = await models.Appointment.findAll({
            where: {
                patient_id: req.user_id
            }
        })
        res.status(200).json({
            resp,
            message: "Here are your appointment"
        })
    } else if(user && user.role_id === 2) {
        let resp = await models.Appointment.findAll();
        res.status(200).json({
            resp,
            message: "Here are your appointment"
        })
    }
}


module.exports = userController;