'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class restaurant_openingHours extends Model {
    static associate (models) {
      // define association
    }
  }
  restaurant_openingHours.init({
    restaurant_id: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    startTime: DataTypes.INTEGER,
    endTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'restaurant_openingHours',
    freezeTableName: true
  })
  return restaurant_openingHours
}
