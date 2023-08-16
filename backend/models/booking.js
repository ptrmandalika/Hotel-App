"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: "user_id", as: "user" });

      this.belongsTo(models.room_type, {
        foreignKey: "room_type_id",
        as: "room_type",
      });

      this.hasMany(models.booking_detail, {
        foreignKey: "booking_id",
        as: "booking_detail",
      });
    }
  }
  booking.init(
    {
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      booking_number: DataTypes.INTEGER,
      booker_name: DataTypes.STRING,
      booker_email: DataTypes.STRING,
      booking_date: DataTypes.DATE,
      check_in_date: DataTypes.DATE,
      check_out_date: DataTypes.DATE,
      guest_name: DataTypes.STRING,
      total_room: DataTypes.INTEGER,
      room_type_id: DataTypes.INTEGER,
      booking_status: DataTypes.ENUM("new", "check_in", "check_out"),
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "booking",
      tableName: "booking",
    }
  );
  return booking;
};
