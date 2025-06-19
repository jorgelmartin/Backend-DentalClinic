const { AccessLog, User } = require('../models');
const searchAccessLogCriteria = require('../services/search/searchAccessLog');
const getPagination = require('../services/search/pagination');

const accessLogController = {};

accessLogController.searchAccessLogs = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const perPage = Math.max(1, parseInt(req.query.per_page) || 6);
        const query = req.query.query;
        const { limit, offset } = getPagination(page, perPage);

        const accessLogCriteria = searchAccessLogCriteria(query);

        const { count, rows } = await AccessLog.findAndCountAll({
            attributes: { exclude: ['ip_address'] }, 
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'lastname', 'email'],
                    required: false,
                }
            ],
            where: accessLogCriteria,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        const totalPages = Math.ceil(count / perPage);

        return res.status(200).json({
            success: true,
            message: "Access logs retrieved",
            data: rows,
            pagination: {
                totalItems: count,
                currentPage: page,
                totalPages,
                perPage,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Access logs could not be retrieved",
            error: error.message,
        });
    }
};

module.exports = accessLogController;