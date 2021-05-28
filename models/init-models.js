const DataTypes = require('sequelize').DataTypes
const _source = require('./source')
const _vender_cuisine_dish_rawData = require('./vender_cuisine_dish_rawData')
const _vender_cuisine_type_rawData = require('./vender_cuisine_type_rawData')
const _vender_input_data = require('./vender_input_data')
const _vender_restaurant_keyword_rawData = require('./vender_restaurant_keyword_rawData')
const _vender_restaurant_review_rawData = require('./vender_restaurant_review_rawData')
const _vender_suitable_purpose_rawData = require('./vender_suitable_purpose_rawData')
const _venders = require('./venders')

function initModels (sequelize) {
  const source = _source(sequelize, DataTypes)
  const vender_cuisine_dish_rawData = _vender_cuisine_dish_rawData(sequelize, DataTypes)
  const vender_cuisine_type_rawData = _vender_cuisine_type_rawData(sequelize, DataTypes)
  const vender_input_data = _vender_input_data(sequelize, DataTypes)
  const vender_restaurant_keyword_rawData = _vender_restaurant_keyword_rawData(sequelize, DataTypes)
  const vender_restaurant_review_rawData = _vender_restaurant_review_rawData(sequelize, DataTypes)
  const vender_suitable_purpose_rawData = _vender_suitable_purpose_rawData(sequelize, DataTypes)
  const venders = _venders(sequelize, DataTypes)

  return {
    source,
    vender_cuisine_dish_rawData,
    vender_cuisine_type_rawData,
    vender_input_data,
    vender_restaurant_keyword_rawData,
    vender_restaurant_review_rawData,
    vender_suitable_purpose_rawData,
    venders
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
