'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appoiment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Appoiment.belongsToMany(models.User, {
        through: 'appointments',
        foreignKey: 'appoiment_id'
      });
    };
    }
  }
  Appoiment.init({
    role_id: DataTypes.INTEGER,
    treatment_id: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    hour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appoiment',
  });
  return Appoiment;
};