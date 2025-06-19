const { Op } = require("sequelize");

const searchAccessLogCriteria = (query) => {
    const criteria = {};

    if (query) {
        const sanitizedQuery = query.trim().replace(/[^\w\s@.:-]/gi, '');
        const searchTerms = `%${sanitizedQuery}%`;

        const fields = [
            'ip_address',
            'route',
            'status_code',
            '$User.name$',
            '$User.lastname$',
            '$User.email$'
        ];

        criteria[Op.or] = fields.map((field) => ({
            [field]: { [Op.like]: searchTerms }
        }));
    }

    return criteria; 
};

module.exports = searchAccessLogCriteria;