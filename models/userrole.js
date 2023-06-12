'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserRole.belongsTo(
        models.User,
        { 
          foreignKey: 'patient_id',
          as: 'patient'
        });
      models.UserRole.belongsTo(
        models.User,
        {
          foreignKey: 'dentist_id',
          as: 'dentist'
        });
      models.UserRole.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      });
    };
  }
  UserRoles.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRoles;
};