'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
static associate(models) {
  models.Appointment.belongsTo(models.Service, {
    foreignKey: 'service_id',
  });
  models.Appointment.belongsTo(models.User, {
    foreignKey: 'patient_id',
    as: 'patient'
  });
  models.Appointment.belongsTo(models.User, {
    foreignKey: 'dentist_id',
    as: 'dentist'
  });
}
  };
  Appointment.init({
    patient_id: DataTypes.INTEGER,
    dentist_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};