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
    }
  }
  Appoiment.init({
    userId: DataTypes.INTEGER,
    treatmentId: DataTypes.INTEGER,
    date: DataTypes.INTEGER,
    hour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appoiment',
  });
  return Appoiment;
};