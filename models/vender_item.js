'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class vender_item extends Model {
    static associate (models) {
      // define association
    }
  }
  vender_item.init({
    restaurant_id: DataTypes.INTEGER,
    restaurant_name: DataTypes.STRING,
    kind: DataTypes.STRING,
    keyId: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vender_item'
  })
  return vender_item
}
