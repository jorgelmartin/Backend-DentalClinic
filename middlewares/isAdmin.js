const isAdmin = (req, res, next) => {
    try {
        // si no eres admin no puede crear libros
        if (req.roleId !== 2) {
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
                error: error
            }
        )
    }
}

module.exports = isAdmin;