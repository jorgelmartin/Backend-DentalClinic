'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
//     static associate(models) {
//       models.Appointment.belongsToMany(models.Service, {
//         through: 'AppointmentService',
//         foreignKey: 'appointment_id',
//         otherKey: 'service_id'
//       });
    
//       models.Service.belongsToMany(models.Appointment, {
//         through: 'AppointmentService',
//         foreignKey: 'service_id',
//         otherKey: 'appointment_id'
//       });
//       models.Appointment.belongsTo(models.User, { foreignKey: 'dentist_id', as: 'dentist' });
// models.Appointment.belongsTo(models.User, { foreignKey: 'patient_id', as: 'patient' });
//     }
static associate(models) {
  models.Appointment.belongsToMany(models.Service, {
    through: 'AppointmentService',
    foreignKey: 'appointment_id',
    otherKey: 'service_id'
  });
}
  };
  appointment.init({
    patient_id: DataTypes.INTEGER,
    dentist_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return appointment;
};