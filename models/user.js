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
      // define association here
      models.User.belongsToMany(
        models.Role,
        {
          through: 'UserRole',
          foreignKey: 'user_id'
        }
      )
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    nif: DataTypes.STRING,
    direction: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};