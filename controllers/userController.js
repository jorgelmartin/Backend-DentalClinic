const { User } = require('../models');
const bcrypt = require('bcrypt');
const { 
    isValidName, 
    validateEmail, 
    isValidDNI, 
    isValidAddress, 
    isValidPhone, 
    isValidField, 
    searchUserCriteria, 
    getPagination } = require('../service/useful');
const userController = {};

//GET PROFILE 
userController.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user_id, {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'role_id'],
            },
        });
        return res.status(200).json({
            success: true,
            message: `User retrieved successfully`,
            data: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to get user',
            error: error.message,
        });
    }
};

// GET USER DETAIL FOR ADMIN
userController.getUserDetailsForAdmin = async (req, res) => {
    const userId = req.params.id; 

    try {
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password'],
            },
        });

        return res.status(200).json({
            success: true,
            message: `User details retrieved successfully for admin`,
            data: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Failed to retrieve user details with ID ${userId}`,
            error: error.message,
        });
    }
};

//UPDATE USER
userController.updateUser = async (req, res) => {
    try {
        const userId = req.user_id;
        const { name, lastname, email, dni, address, phone, password } = req.body;
        let updatedFields = {};

        // Validations
        isValidField(name, isValidName, "Name must contain only letters and spaces, up to 40 characters");
        isValidField(lastname, isValidName, "Lastname must contain only letters and spaces, up to 40 characters");
        isValidField(email, validateEmail, "Email not valid");
        isValidField(dni, isValidDNI, "Invalid DNI format. It should be in the format X1234567Y or 12345678Z.");
        isValidField(address, isValidAddress, "Address must contain only letters and spaces, up to 40 characters");
        isValidField(phone, isValidPhone, "Phone number must contain only digits and can optionally start with a '+' sign, up to 15 characters");

        if (name) updatedFields.name = name;
        if (lastname) updatedFields.lastname = lastname;
        if (email) updatedFields.email = email;
        if (dni) updatedFields.dni = dni;
        if (address) updatedFields.address = address;
        if (phone) updatedFields.phone = phone;
        if (password) updatedFields.password = bcrypt.hashSync(password, 8);

        const userUpdated = await User.update(updatedFields, {
            where: {
                id: userId
            }
        });

        return res.status(200).json({
            success: true,
            message: "User updated",
            data: userUpdated
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can't be updated",
            error: error.message
        });
    }
};

//GET ALL THE USERS
userController.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 6;
        const query = req.query.query;
        const { limit, offset } = getPagination(page, perPage);

        const searchCriteria = searchUserCriteria(query);

        const { count, rows } = await User.findAndCountAll({
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt'],
            },
            where: searchCriteria,
            limit: limit,
            offset: offset,
        });

        const totalPages = Math.ceil(count / perPage);

        return res.status(200).json({
            success: true,
            message: "Users retrieved",
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
            message: "Users can't be retrieved",
            error: error.message,
        });
    }
};

//GET ALL DENTIST
userController.getAllDentists = async (req, res) => {
    try {
        const dentists = await User.findAll({
            where: { role_id: 2 },
            attributes: ['id', 'name', 'lastname'], 
        });

        return res.status(200).json({
            success: true,
            message: "Dentists retrieved",
            data: dentists,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve dentists",
            error: error.message,
        });
    }
};

module.exports = userController;