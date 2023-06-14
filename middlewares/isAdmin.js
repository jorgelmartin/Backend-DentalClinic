const isAdmin = (req, res, next) => {
    try {
        if (req.role_id !== 2) {
            return res.json({
                success: true,
                message: "You needAdmin permissions"
            });
        } 
        
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "You need Admin permissions",
            error: error
        });   
    }
}

module.exports = isAdmin;