const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "vender_input_data",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      vender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      restaurant_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      keyword: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dish: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_datetime: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_datetime: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "vender_input_data",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
