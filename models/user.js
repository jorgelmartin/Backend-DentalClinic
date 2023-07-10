'use strict';
const {
  Model
} = require('sequelize');
const { PassThrough } = require('stream');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.User.hasMany(models.Appointment, {
          foreignKey: 'patient_id',
          as: 'appointments',
        });
        models.User.hasMany(models.Appointment, {
          foreignKey: 'dentist_id',
          as: 'dentistAppointments',
        });
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dni: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    age: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};