const { log } = require("console");
const { User } = require("../models");
const { QueryTypes } = require('sequelize');

const userController = {};

userController.createUser = async(req, res) => {
    try {
        const { name,email,password,role_id } = req.body;

        //validaciones

        const newUser = await User.create(
            {
                name,
                email,
                password,
                role_id
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
}

userController.updateUser = async(req, res) => {
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

        const { name,email,password,role_id } = req.body;

        const userUpdated = await User.update(
            {
                name,
                email,
                password,
                role_id
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

userController.deleteUser = async(req, res) => {
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

userController.getAllUsers = async(req, res) => {
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

// userController.getUserTreatmentsAppoiments = (req, res) => {
//     try {
//         const userId = req.userId;
//         // console.log(req.userId);
//         const getUserTreatmentAppoiments = User.findByPk(
//             userId,
//             );

//         return res.json({
//             success: true,
//             message: "Get all treatment appointments",
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