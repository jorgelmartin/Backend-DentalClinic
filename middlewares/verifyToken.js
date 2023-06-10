const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;

        if(!bearerToken) {
            return res.json(
                {
                    succes: true,
                    message: "no puedes pasar"
                }
            )
        }

        const token = bearerToken.split(" ")[1];         

        const decoded = jwt.verify(token, 'secreto');

        req.user_id = decoded.user_id;
        req.role_id = decoded.role_id;

        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Token Invalid",
                error: error
            }
        )
    }
};

module.exports = auth;