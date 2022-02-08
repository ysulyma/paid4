'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hearing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hearing.init({
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    filename: DataTypes.STRING,
    date: DataTypes.STRING,
    url: DataTypes.STRING,
    data: DataTypes.JSONB,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hearing',
  });
  return Hearing;
};