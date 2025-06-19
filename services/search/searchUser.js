const { Op } = require("sequelize");

const searchUserCriteria = (query) => {
    let criteria = {};

    if (query) {
        const sanitizedQuery = query.trim().replace(/[^\w\s.-@]/gi, '');
        const searchTerms = `%${sanitizedQuery}%`;

        const fields = ['name', 'lastname', 'email', 'dni', 'address', 'phone'];
        criteria[Op.or] = fields.map((field) => ({
            [field]: { [Op.like]: searchTerms }
        }));
    }

    return criteria;
};

module.exports = searchUserCriteria;