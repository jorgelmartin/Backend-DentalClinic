const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {};

//REGISTER
authController.register = async (req, res) => {
    try {
        if (req.body.password.length < 6) {
            return res.send('Password must be longer than 6 characters');
        }
        const validateEmail = (email) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };
        if (!validateEmail(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: "Email not valid",
            });
        }
        const newPassword = bcrypt.hashSync(req.body.password, 8);
        const newUser = await User.create(
            {
                "fullname": req.body.fullname,
                "email":req.body.email,
                "password": newPassword,
                "nif": req.body.nif,
                "direction": req.body.direction,
                "age": req.body.age,
                "phone": req.body.phone,
                role_id: 3
            }
        );
        return res.send(newUser);
    } catch (error) {
        return res.send('Something went wrong creating users ' + error.message)
    }
}
//LOGIN
authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne(
            {
                where: {
                    email: email
                }
            }
        );
        if (!user) {
            return res.json(
                {
                    success: true,
                    message: "Wrong credentials"
                }
            )
        }
        //Verify password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.json(
                {
                    success: true,
                    message: "Wrong credentials"
                }
            )
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
        
        return res.json(
            {
                success: true,
                message: "User logged",
                token: token
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