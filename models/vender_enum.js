'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class vender_enum extends Model {
    static associate (models) {
      // define association
    }
  }
  vender_enum.init({
    kind: DataTypes.STRING,
    keyId: DataTypes.STRING,
    value: DataTypes.STRING,
    remark: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vender_enum',
    freezeTableName: true
  })
  return vender_enum
}
