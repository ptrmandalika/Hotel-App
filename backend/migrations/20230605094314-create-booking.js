"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("booking", {
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      booking_number: {
        type: Sequelize.INTEGER,
      },
      booker_name: {
        type: Sequelize.STRING,
      },
      booker_email: {
        type: Sequelize.STRING,
      },
      booking_date: {
        type: Sequelize.DATE,
      },
      check_in_date: {
        type: Sequelize.DATE,
      },
      check_out_date: {
        type: Sequelize.DATE,
      },
      guest_name: {
        type: Sequelize.STRING,
      },
      total_room: {
        type: Sequelize.INTEGER,
      },
      room_type_id: {
        type: Sequelize.INTEGER,
      },
      booking_status: {
        type: Sequelize.ENUM("new", "check_in", "check_out"),
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("booking");
  },
};
