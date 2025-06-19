const { AccessLog } = require('../models'); 

const accessLogMiddleware = async (req, res, next) => {
    const { ip, originalUrl } = req;

    // Wait until the response has finished sending.
    res.on('finish', async () => {
        const statusCode = res.statusCode;
        try {
            await AccessLog.create({
                user_id: req?.user_id,
                ip_address: ip,
                route: originalUrl,
                status_code: statusCode,
            });
        } catch (error) {
            console.error('Error logging access:', error);
        }
    });

    next();
};

module.exports = accessLogMiddleware;