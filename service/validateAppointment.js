// Appointment validation

// Validate that the appointment date is future and not on a weekend
module.exports.validateAppointmentDate = (date, hour, errorMessage) => {
    const appointmentDate = new Date(
        ...date.split('/').reverse().map((val, i) => (i === 0 ? val : val - 1)), 
        ...hour.split(':').map(Number)
    );
    const currentDate = new Date();

    // Check if the appointment date is in the future
    if (appointmentDate <= currentDate) throw new Error(errorMessage);
    // Check if the appointment date is a weekend
    if (appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) throw new Error(errorMessage);

    return true; 
};

// Validate that there are no duplicate appointments for the doctor
module.exports.isDoctorAvailable = async (Appointment, dentist_id, date, hour) => {
    const existingAppointment = await Appointment.findOne({
        where: {
            dentist_id: dentist_id,
            date: date, 
            hour: hour
        }
    });
    return !existingAppointment; 
};

// Validate that there are no duplicate appointments for the patient
module.exports.isPatientAvailable = async (Appointment, patient_id, date, hour) => {
    const patientAppointment = await Appointment.findOne({
        where: {
            patient_id: patient_id,
            date: date, 
            hour: hour 
        }
    });
    return !patientAppointment;
};

// Check if the appointment exists and belongs to the correct user
module.exports.findAppointment = async (Appointment, appointmentId, userId, userRoleId) => {
    if (userRoleId === 2) {
        return await Appointment.findOne({
            where: {
                id: appointmentId
            }
        });
    } else {
        return await Appointment.findOne({
            where: {
                id: appointmentId,
                patient_id: userId
            }
        });
    }
};