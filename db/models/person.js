'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Person.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    openSecrets: DataTypes.STRING,
    party: DataTypes.STRING,
    state: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};