'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class google_details extends Model {
    static associate (models) {
      // define association
    }
  }
  google_details.init({
    restaurant_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    place_id: DataTypes.STRING,
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
    modelName: 'google_details',
    freezeTableName: true
  })
  return google_details
}
