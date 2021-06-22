'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class google_reviews extends Model {
    static associate (models) {
      // define association
    }
  }
  google_reviews.init({
    restaurant_id: DataTypes.INTEGER,
    place_id: DataTypes.STRING,
    author_name: DataTypes.STRING,
    author_url: DataTypes.STRING,
    language: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    relative_time_description: DataTypes.STRING,
    text: DataTypes.TEXT,
    review_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'google_reviews',
    freezeTableName: true
  })
  return google_reviews
}
