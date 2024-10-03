const { Op } = require("sequelize");

//Validations
module.exports.isValidField = (field, validator, errorMessage) => {
    if (field && !validator(field)) {
        throw new Error(errorMessage);
    }
};

// clean Special Characters
module.exports.cleanSpecialCharacters = (input) => {
    return input.replace(/[^\w\s]/gi, ''); 
};

// Utility function to search appointment
module.exports.searchAppointmentCriteria = (user, searchQuery) => {
    let searchCriteria = {};

    if (user.role_id !== 2) {
        searchCriteria = { patient_id: user.id };
    }

    if (searchQuery) {
        const sanitizedQuery = cleanSpecialCharacters(searchQuery.trim());
        const searchTerms = `%${sanitizedQuery}%`;

        searchCriteria[Op.or] = [
            { '$Service.name$': { [Op.like]: searchTerms } },
            { '$Service.price$': { [Op.like]: searchTerms } },
            { '$patient.name$': { [Op.like]: searchTerms } },
            { '$patient.lastname$': { [Op.like]: searchTerms } },
            { '$dentist.name$': { [Op.like]: searchTerms } },
            { '$dentist.lastname$': { [Op.like]: searchTerms } }
        ];
    }

    return searchCriteria;
};

// Utility function search users
module.exports.searchUserCriteria = (query) => {
    let searchCriteria = {};

    if (query) {
        const sanitizedQuery = cleanSpecialCharacters(query.trim());
        const searchTerms = `%${sanitizedQuery}%`;

        searchCriteria[Op.or] = [
            { id: { [Op.like]: searchTerms } },
            { name: { [Op.like]: searchTerms } },
            { lastname: { [Op.like]: searchTerms } },
            { email: { [Op.like]: searchTerms } },
            { dni: { [Op.like]: searchTerms } },
            { address: { [Op.like]: searchTerms } },
            { phone: { [Op.like]: searchTerms } }
        ];
    }

    return searchCriteria;
};

// Function to handle pagination
module.exports.getPagination = (page, perPage) => {
    const offset = (page - 1) * perPage;
    return { limit: perPage, offset: offset };
};