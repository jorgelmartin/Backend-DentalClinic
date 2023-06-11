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
    static associate(models) {
      // define association here
      models.Appointment.belongsToMany(
        models.Service,
        {
          through: 'AppointmentService',
          foreignKey: 'appointment_id'
        }
      );
    }
  }
  appointment.init({
    patient_id: DataTypes.INTEGER,
    dentist_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    hour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return appointment;
};