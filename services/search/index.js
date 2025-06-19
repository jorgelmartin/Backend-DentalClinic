const search = {};

search.searchUserCriteria = require('./userSearch');
search.searchAppointmentCriteria = require('./appointmentSearch');
search.getPagination = require('./pagination');

module.exports = search;