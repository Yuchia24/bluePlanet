'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class google_photos extends Model {
    static associate (models) {
      // define association
    }
  }
  google_photos.init({
    restaurant_id: DataTypes.INTEGER,
    place_id: DataTypes.STRING,
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    html_attributions: DataTypes.TEXT,
    photo_reference: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'google_photos',
    freezeTableName: true
  })
  return google_photos
}
