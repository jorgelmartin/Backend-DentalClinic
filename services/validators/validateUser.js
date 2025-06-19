// User validation
const validateUser = {};

validateUser.isValidEmail = (email) => {
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailCheck.test(email);
};

validateUser.isValidName = (name) => {
    const nameCheck = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/; 
    return nameCheck.test(name);
};

validateUser.isValidDNI = (dni) => {
    const dniCheck = /^[XYZxyz]\d{7}[a-zA-Z]$|^\d{8}[a-zA-Z]$/; 
    return dniCheck.test(dni);
};

validateUser.isValidAddress = (address) => {
    const addressCheck = /^[a-zA-Z0-9\s]{1,40}$/;
    return addressCheck.test(address);
};

validateUser.isValidPhone = (phone) => {
    const phoneCheck = /^\+?\d{1,15}$/;
    return phoneCheck.test(phone);
};

module.exports = validateUser;
