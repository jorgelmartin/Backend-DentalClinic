const { log } = require("console");
const { User, Role, UserRole } = require("../models");
const { QueryTypes } = require('sequelize');

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
            include: [
                {
                    model: UserRole,
                    as: 'userRoles',
                    include: [
                        {
                            model: Role,
                            as: 'role',
                            attributes: {
                                exclude: ["updatedAt", "createdAt"],
                            },
                        },
                    ],
                },
            ],
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

        const { fullname, email, password, nif, role_id, direction, age, phone } = req.body;

        const userUpdated = await User.update(
            {
                fullname,
                email,
                password,
                nif,
                role_id,
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

// userController.getUserServicesappointments = (req, res) => {
//     try {
//         const userId = req.userId;
//         // console.log(req.userId);
//         const getUserAppointmentServices = User.findByPk(
//             userId,
//             );

//         return res.json({
//             success: true,
//             message: "Get all service appointments",
//             // data: users
//         })
//     } catch (error) {
//         return res.status(500).json(
//             {
//                 success: false,
//                 // message:

//             }
//         )

//     }
// }

module.exports = userController;