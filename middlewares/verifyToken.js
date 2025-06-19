const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "";

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

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user_id = decoded.userId;
        req.role_id = decoded.roleId;

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