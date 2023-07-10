const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {


    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token not provided",
            });
        }

        const token = bearerToken.split(" ")[1];

        const decoded = jwt.verify(token, 'secreto');


        req.user_id = decoded.userId;
        req.role_id = decoded.roleId;
        console.log("req.user_id:", req.user_id);

        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Token Invalid",
                error: error.message
            }
        )
    }
};

module.exports = auth;