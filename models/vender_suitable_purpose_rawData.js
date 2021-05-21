const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vender_suitable_purpose_rawData', {
    vsp_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    vender_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    posted_data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    suitable_purpose_data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'vender_suitable_purpose_rawData',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vsp_id" },
        ]
      },
    ]
  });
};
