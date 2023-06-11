const isDentist = (req, res, next) => {
    try {
        if (req.role_id !== 2) {
            return res.json({
                success: true,
                message: "You dont have permissions"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "You dont have permissions",
                error: error.message
            }
        )
    }
};

module.exports = isDentist;