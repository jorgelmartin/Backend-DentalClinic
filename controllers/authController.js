const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateEmail, isValidName, isValidDNI, isValidAddress, isValidPhone, isValidField } = require('../service/useful');

const authController = {};

//REGISTER
authController.register = async (req, res) => {
    try {
        const { name, lastname, email, password, dni, address, phone } = req.body;

        // Validations
        isValidField(password, (pw) => pw.length >= 6, "Password must be longer than 6 characters");
        isValidField(email, validateEmail, "Email not valid");
        isValidField(name, isValidName, "Name must contain only letters and spaces, up to 40 characters");
        isValidField(lastname, isValidName, "Lastname must contain only letters and spaces, up to 40 characters");
        isValidField(dni, isValidDNI, "Invalid DNI format. It should be in the format X1234567Y or 12345678Z.");
        isValidField(address, isValidAddress, "Address must contain only letters and spaces, up to 40 characters");
        isValidField(phone, isValidPhone, "Phone number must contain only digits and can optionally start with a '+' sign, up to 15 characters");

        // Create new user
        const newPassword = bcrypt.hashSync(password, 8);
        const newUserFields = {
            name,
            lastname,
            email,
            password: newPassword,
            dni,
            address,
            phone,
            role_id: 3 
        };

        const newUser = await User.create(newUserFields);
        return res.status(200).json(
            {
                success: true,
                message: "User registered",
                user: newUser
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Something went wrong creating users ${error.message}`
        });
    }
};

//LOGIN
authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        
        if (!user || !bcrypt.compareSync(password, user.password)) {
            // USER NOT FOUND
            return res.status(401).json({
                success: false,
                message: "Wrong credentials"
            });
        }
        const token = jwt.sign(
            { 
                userId: user.id,
                roleId: user.role_id,
                email: user.email
            },
            'secreto',
            {
                expiresIn: '3h' 
            }
        );
        
        return res.status(200).json(
            {
                success: true,
                message: "User logged",
                token: token,
                user: user
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "User cant be logged",
                error: error.message
            }
        )
    }
}

module.exports = authController