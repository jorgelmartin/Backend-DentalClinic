'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Service.belongsToMany(models.Appointment, 
      {
        through: 'AppointmentService',
        foreignKey: 'service_id',
        otherKey: 'appointment_id'
      });
    }
  }
  Service.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    duration: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};