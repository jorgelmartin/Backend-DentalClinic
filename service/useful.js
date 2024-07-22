const { Op } = require("sequelize");

//Validations
module.exports.isValidField = (field, validator, errorMessage) => {
    if (field && !validator(field)) {
        throw new Error(errorMessage);
    }
};

module.exports.validateEmail = (email) => {
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailCheck.test(email);
};

module.exports.isValidName = (name) => {
    const nameCheck = /^[a-zA-Z\s]{1,40}$/; 
    return nameCheck.test(name);
};

module.exports.isValidDNI = (dni) => {
    const dniCheck = /^[XYZxyz]\d{7}[a-zA-Z]$|^\d{8}[a-zA-Z]$/; 
    return dniCheck.test(dni);
};

module.exports.isValidAddress = (address) => {
    const addressCheck = /^[a-zA-Z0-9\s]{1,40}$/;
    return addressCheck.test(address);
};

module.exports.isValidPhone = (phone) => {
    const phoneCheck = /^\+?\d{1,14}$/;
    return phoneCheck.test(phone);
};

// Utility function to handle pagination
module.exports.getPagination = (page, perPage) => {
    const offset = (page - 1) * perPage;
    return { limit: perPage, offset: offset };
};

// clean Special Characters
const cleanSpecialCharacters = (input) => {
    return input.replace(/[^\w\s]/gi, ''); 
};

// Utility function to search Appointment
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