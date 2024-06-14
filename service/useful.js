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
    const addressCheck = /^[a-zA-Z\s]{1,40}$/;
    return addressCheck.test(address);
};

module.exports.isValidPhone = (phone) => {
    const phoneCheck = /^\+?\d{1,14}$/;
    return phoneCheck.test(phone);
};