'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SqUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SqUsers.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    date_of_creation: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SqUsers',
  });
  return SqUsers;
};