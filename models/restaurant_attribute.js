const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('restaurant_attribute', {
    attribute_id: {
      autoIncrement: true,
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.ENUM('Cuisine Nationality','Cuisine Type','Suitable Purpose'),
      allowNull: true
    },
    zh_TW: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    en_US: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    th_TH: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    zh_HK: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ""
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
    tableName: 'restaurant_attribute',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "attribute_id" },
        ]
      },
    ]
  });
};
