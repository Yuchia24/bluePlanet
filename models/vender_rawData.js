'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class vender_rawData extends Model {
    static associate (models) {
      // define association
    }
  }
  vender_rawData.init({
    vender_id: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    posted_data: DataTypes.TEXT,
    response_data: DataTypes.TEXT,
    api_url: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vender_rawData'
  })
  return vender_rawData
}
