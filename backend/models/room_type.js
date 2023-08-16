"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class room_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.room, { foreignKey: "room_type_id", as: "room" });

      this.hasMany(models.booking, {
        foreignKey: "room_type_id",
        as: "booking",
      });
    }
  }
  room_type.init(
    {
      room_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      room_type_name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "room_type",
      tableName: "room_type",
    }
  );
  return room_type;
};
