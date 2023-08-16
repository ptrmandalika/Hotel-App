var router = require("express").Router();
const { Op } = require("sequelize");
const booking = require("../models/index").booking;
const room_type = require("../models/index").room_type;
const room = require("../models/index").room;
const booking_detail = require("../models/index").booking_detail;
const { mustLogin } = require("../middlewares/auth");

// Get all bookings
router.get("/booking", mustLogin, async (req, res) => {
  try {
    const response = await booking.findAll({
      include: ["user", "room_type"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.get("/filtering2", mustLogin, async (req, res) => {
  let guestName = req.query.guest_name;
  let whereCondition = {
    booker_name: {
      [Op.like]: `%${guestName}%`,
    },
  };
  try {
    const response = await booking.findAll({
      include: ["user", "room_type"],
      where: whereCondition,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get booking by id
router.get("/booking/:id", mustLogin, async (req, res) => {
  try {
    const response = await booking.findOne({
      include: ["user", "room_type"],
      where: {
        booking_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get booking by guest name
router.get("/filtering", async (req, res) => {
  let guestName = req.query.guest_name;
  let whereCondition = {
    booker_name: {
      [Op.like]: `%${guestName}%`,
    },
  };
  try {
    const response = await booking.findAll({
      where: whereCondition,
    });
    res.status(200).json(...response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Create a new booking
router.post("/booking", async (req, res) => {
  let dt = Date.now();
  let receiptNum = Math.floor(
    Math.random() * (1000000000 - 99999999) + 99999999
  );

  let data = {
    booking_number: receiptNum,
    booker_name: req.body.booker_name,
    booker_email: req.body.booker_email,
    booking_date: dt,
    check_in_date: req.body.check_in_date,
    check_out_date: req.body.check_out_date,
    guest_name: req.body.guest_name,
    total_room: req.body.total_room,
    room_type_id: req.body.room_type_id,
    booking_status: "new",
    user_id: req.body.user_id,
  };

  // Room Data
  let roomData = await room.findAll({
    where: { room_type_id: data.room_type_id },
  });

  // Room Type Data
  let roomTypeData = await room_type.findAll({
    where: { room_type_id: data.room_type_id },
  });

  // Booking Data
  let bookingData = await room_type.findAll({
    attributes: ["room_type_id", "room_type_name"],
    where: { room_type_id: data.room_type_id },
    include: [
      {
        model: room,
        as: "room",
        attributes: ["room_id", "room_type_id"],
        include: [
          {
            model: booking_detail,
            as: "booking_detail",
            attributes: ["access_date"],
            where: {
              access_date: {
                [Op.between]: [data.check_in_date, data.check_out_date],
              },
            },
          },
        ],
      },
    ],
  });

  // Get Available Room
  let bookedRoomId = bookingData[0].room.map((room) => room.room_id);
  let availableRoom = roomData.filter(
    (room) => !bookedRoomId.includes(room.room_id)
  );

  // Process Booking Room Where Status is Available
  let roomDataSelected = availableRoom.slice(0, data.total_room);

  // Count Day
  let checkIn = new Date(data.check_in_date);
  let checkOut = new Date(data.check_out_date);
  const dayTotal = Math.round((checkOut - checkIn) / (1000 * 3600 * 24));

  if (
    roomData === null ||
    availableRoom.length < data.total_room ||
    dayTotal === 0 ||
    roomDataSelected === null
  ) {
    return res.json({ massage: "Room not Available" });
  } else {
    await booking
      .create(data)
      .then(async (result) => {
        for (let i = 0; i < dayTotal; i++) {
          for (let j = 0; j < roomDataSelected.length; j++) {
            let access_date = new Date(checkIn);
            access_date.setDate(access_date.getDate() + i);

            let dataDetail = {
              booking_id: result.booking_id,
              room_id: roomDataSelected[j].room_id,
              access_date: access_date,
              price: roomTypeData.price,
            };
            await booking_detail.create(dataDetail);
          }
        }
        res.status(201).json({ msg: "Booking Created", data: result });
      })
      .catch((error) => res.status(400).json({ msg: error.message }));
  }
});

// Update booking status
router.put("/booking/:id", mustLogin, async (req, res) => {
  let params = { booking_id: req.params.id };

  let data = {
    booking_status: req.body.booking_status,
    user_id: req.body.user_id,
  };

  try {
    await booking.update(data, { where: params });
    res.status(201).json({ msg: "Booking Status Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Delete booking
router.delete("/booking/:id", mustLogin, async (req, res) => {
  let params = { booking_id: req.params.id };

  try {
    await booking_detail.destroy({ where: params });
    await booking.destroy({ where: params });
    res.status(200).json({ msg: "Booking Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get available room by date
router.post("/filtering", async (req, res) => {
  let checkInDate = req.body.check_in_date;
  let checkOutDate = req.body.check_out_date;

  let roomData = await room_type.findAll({
    include: [{ model: room, as: "room" }],
  });

  let roomBookedData = await room_type.findAll({
    attributes: ["room_type_id", "room_type_name"],
    include: [
      {
        model: room,
        as: "room",
        include: [
          {
            model: booking_detail,
            as: "booking_detail",
            attributes: ["access_date"],
            where: {
              access_date: {
                [Op.between]: [checkInDate, checkOutDate],
              },
            },
          },
        ],
      },
    ],
  });

  let available = [];
  let availableByType = [];

  for (let i = 0; i < roomData.length; i++) {
    roomData[i].room.forEach((room) => {
      let isBooked = false;
      roomBookedData.forEach((booked) => {
        booked.room.forEach((bookedRoom) => {
          if (room.room_id === bookedRoom.room_id) {
            isBooked = true;
          }
        });
      });
      if (!isBooked) {
        available.push(room);
      }
    });
  }

  for (let i = 0; i < roomData.length; i++) {
    let roomType = {};
    roomType.room_type_id = roomData[i].room_type_id;
    roomType.room_type_name = roomData[i].room_type_name;
    roomType.price = roomData[i].price;
    roomType.description = roomData[i].description;
    roomType.image = roomData[i].image;
    roomType.room = [];
    available.forEach((room) => {
      if (room.room_type_id === roomData[i].room_type_id) {
        roomType.room.push(room);
      }
    });
    if (roomType.room.length > 0) {
      availableByType.push(roomType);
    }
  }
  return res.json({ room: availableByType });
});

module.exports = router;
