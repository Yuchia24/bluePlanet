const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vender_cuisine_type_rawData', {
    vct_id: {
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
    cuisine_type_data: {
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
    tableName: 'vender_cuisine_type_rawData',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "vct_id" },
        ]
      },
    ]
  });
};
