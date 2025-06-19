//Validations
const isValidField = (field, validator, errorMessage) => {
    if (field && !validator(field)) {
        throw new Error(errorMessage);
    }
};

module.exports = isValidField;