const { Op } = require("sequelize");

const searchAppointmentCriteria = (user, query) => {
    let criteria = {};

    if (user.role_id !== 2) {
        criteria = { patient_id: user.id };
    }

    if (query) {
        const sanitizedQuery = query.trim().replace(/[^\w\s.-@]/gi, '');
        const searchTerms = `%${sanitizedQuery}%`;

        const fields = [
            '$Service.name$',
            '$Service.price$',
            '$patient.name$',
            '$patient.lastname$',
            '$dentist.name$',
            '$dentist.lastname$'
        ];

        criteria[Op.or] = fields.map((field) => ({
            [field]: { [Op.like]: searchTerms }
        }));
    }

    return criteria;
};

module.exports = searchAppointmentCriteria;