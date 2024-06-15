const { User } = require('../models');
const bcrypt = require('bcrypt');
const { isValidName, validateEmail, isValidDNI, isValidAddress, isValidPhone, isValidField } = require('../service/useful');
const userController = {};

//GET PROFILE 
userController.getUser = async (req, res) => {
    try {
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
        // Get the pagination parameters of the request
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 6;

        // Calculate the offset for the query
        const offset = (page - 1) * perPage;

        // Get user with pagination
        const { count, rows } = await User.findAndCountAll({
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt'],
            },
            limit: perPage,
            offset: offset,
        });

        // Calculate total pages
        const totalPages = Math.ceil(count / perPage);

        // Build response with pagination metadata
        return res.status(200).json({
            success: true,
            message: "Get all users retrieved",
            page: page,
            perPage: perPage,
            total: count,
            totalPages: totalPages,
            data: rows,
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
            message: "All dentists retrieved",
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