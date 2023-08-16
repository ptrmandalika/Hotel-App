var router = require("express").Router();
const room = require("../models/index").room;
const { mustLogin, mustAdmin } = require("../middlewares/auth");

// Get all rooms
router.get("/room", mustLogin, mustAdmin, async (req, res) => {
  try {
    const response = await room.findAll({
      include: ["room_type"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get room by id
router.get("/room/:id", mustLogin, mustAdmin, async (req, res) => {
  try {
    const response = await room.findOne({
      include: ["room_type"],
      where: {
        room_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Create room
router.post("/room", mustLogin, mustAdmin, async (req, res) => {
  let data = {
    room_number: req.body.room_number,
    room_type_id: req.body.room_type_id,
  };

  try {
    await room.create(data);
    res.status(201).json({ msg: "Room Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//Update room
router.put("/room/:id", mustLogin, mustAdmin, async (req, res) => {
  let params = { room_id: req.params.id };

  let data = {
    room_number: req.body.room_number,
    room_type_id: req.body.room_type_id,
  };

  try {
    await room.update(data, { where: params });
    res.status(201).json({ msg: "Room Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Delete room
router.delete("/room/:id", mustLogin, mustAdmin, async (req, res) => {
  let params = { room_id: req.params.id };

  try {
    await room.destroy({ where: params });
    res.status(200).json({ msg: "Room Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
