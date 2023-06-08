'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Treatment.belongsToMany(
        models.User,
        {
          through: 'Appoiments',
          foreignKey: 'treatment_id'
        }
      )
    }
  }
  Treatment.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    duration: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Treatment',
  });
  return Treatment;
};