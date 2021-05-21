var DataTypes = require("sequelize").DataTypes;
var _data1 = require("./data1");
var _restaurant_attribute = require("./restaurant_attribute");
var _source = require("./source");
var _vender_cuisine_nationality_rawData = require("./vender_cuisine_nationality_rawData");
var _vender_cuisine_type_rawData = require("./vender_cuisine_type_rawData");
var _vender_input_data = require("./vender_input_data");
var _vender_restaurant_keyword_rawData = require("./vender_restaurant_keyword_rawData");
var _vender_restaurant_review_rawData = require("./vender_restaurant_review_rawData");
var _vender_suitable_purpose_rawData = require("./vender_suitable_purpose_rawData");
var _venders = require("./venders");

function initModels(sequelize) {
  var data1 = _data1(sequelize, DataTypes);
  var restaurant_attribute = _restaurant_attribute(sequelize, DataTypes);
  var source = _source(sequelize, DataTypes);
  var vender_cuisine_nationality_rawData = _vender_cuisine_nationality_rawData(sequelize, DataTypes);
  var vender_cuisine_type_rawData = _vender_cuisine_type_rawData(sequelize, DataTypes);
  var vender_input_data = _vender_input_data(sequelize, DataTypes);
  var vender_restaurant_keyword_rawData = _vender_restaurant_keyword_rawData(sequelize, DataTypes);
  var vender_restaurant_review_rawData = _vender_restaurant_review_rawData(sequelize, DataTypes);
  var vender_suitable_purpose_rawData = _vender_suitable_purpose_rawData(sequelize, DataTypes);
  var venders = _venders(sequelize, DataTypes);


  return {
    data1,
    restaurant_attribute,
    source,
    vender_cuisine_nationality_rawData,
    vender_cuisine_type_rawData,
    vender_input_data,
    vender_restaurant_keyword_rawData,
    vender_restaurant_review_rawData,
    vender_suitable_purpose_rawData,
    venders,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
