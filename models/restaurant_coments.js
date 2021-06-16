'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class restaurant_comments extends Model {
    static associate (models) {
      // define association
    }
  }
  restaurant_comments.init({
    restaurant_id: DataTypes.INTEGER,
    author: DataTypes.STRING,
    comment_time: DataTypes.DATE,
    content: DataTypes.TEXT,
    star: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'restaurant_comments',
    freezeTableName: true
  })
  return restaurant_comments
}
