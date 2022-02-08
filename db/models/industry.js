'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Industry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Industry.init({
    name: DataTypes.STRING,
    keywords: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Industry',
  });
  return Industry;
};