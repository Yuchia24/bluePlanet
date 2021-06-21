'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class restaurant_basic extends Model {
    static associate (models) {
      // define association
    }
  }
  restaurant_basic.init({
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    formatted_phone_number: DataTypes.STRING,
    name: DataTypes.STRING,
    price_level: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    user_ratings_total: DataTypes.INTEGER,
    route: DataTypes.STRING,
    locationLat: DataTypes.DOUBLE,
    locationLng: DataTypes.DOUBLE,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'restaurant_basic',
    freezeTableName: true
  })
  return restaurant_basic
}
