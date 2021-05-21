const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vender_input_data', {
    id: {
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
    keyword: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    restaurant_attribute: {
      type: DataTypes.STRING(255),
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
    tableName: 'vender_input_data',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
