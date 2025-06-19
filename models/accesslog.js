'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.AccessLog.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  AccessLog.init({
    user_id: DataTypes.INTEGER,
    ip_address: DataTypes.STRING,
    route: DataTypes.STRING,
    status_code: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AccessLog',
  });
  return AccessLog;
};