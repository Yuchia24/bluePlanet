'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class restaurant_basic_extend extends Model {
    static associate (models) {
      // define association
    }
  }
  restaurant_basic_extend.init({
    restaurant_id: DataTypes.INTEGER,
    group: DataTypes.STRING,
    value: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'restaurant_basic_extend',
    freezeTableName: true
  })
  return restaurant_basic_extend
}
