var router = require("express").Router();
const path = require("path");
const fs = require("fs");
const room_type = require("../models/index").room_type;
const { uploadRoomType } = require("../middlewares/upload");
const { mustLogin, mustAdmin } = require("../middlewares/auth");

// Get all room types
router.get("/roomtype", async (req, res) => {
  try {
    const response = await room_type.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get room type by id
router.get("/roomtype/:id", async (req, res) => {
  try {
    const response = await room_type.findOne({
      where: {
        room_type_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Create room type
router.post(
  "/roomtype",
  mustLogin,
  mustAdmin,
  uploadRoomType.single("image"),
  async (req, res) => {
    let finalImageURL =
      req.protocol + "://" + req.get("host") + "/roomtype/" + req.file.filename;

    let data = {
      room_type_name: req.body.room_type_name,
      price: req.body.price,
      description: req.body.description,
      image: finalImageURL,
    };

    try {
      await room_type.create(data);
      res.status(201).json({ msg: "Room Type Created" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
);

// Update room type
router.put(
  "/roomtype/:id",
  mustLogin,
  mustAdmin,
  uploadRoomType.single("image"),
  async (req, res) => {
    let params = { room_type_id: req.params.id };

    let data = {
      room_type_name: req.body.room_type_name,
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      let oldImg = await room_type.findOne({ where: params });
      let odlImgName = oldImg.image.replace(
        req.protocol + "://" + req.get("host") + "/roomtype/",
        ""
      );
      let loc = path.join(__dirname, "../public/roomtype", odlImgName);
      fs.unlink(loc, (error) => console.log(error));
      let finalImageURL =
        req.protocol +
        "://" +
        req.get("host") +
        "/roomtype/" +
        req.file.filename;
      data.image = finalImageURL;
    }

    try {
      await room_type.update(data, { where: params });
      res.status(201).json({ msg: "Room Type Updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
);

// Delete room type
router.delete("/roomtype/:id", mustLogin, mustAdmin, async (req, res) => {
  let params = { room_type_id: req.params.id };

  let delImg = await room_type.findOne({ where: params });
  if (delImg) {
    let oldImgName = delImg.image.replace(
      req.protocol + "://" + req.get("host") + "/roomtype/",
      ""
    );
    let loc = path.join(__dirname, "../public/roomtype", oldImgName);
    fs.unlink(loc, (error) => console.log(error));
  }

  try {
    await room_type.destroy({ where: params });
    res.status(200).json({ msg: "Room Type Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
