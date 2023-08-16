var router = require("express").Router();
const booking_detail = require("../models/index").booking_detail;

router.get("/bookingdetail", async (req, res) => {
  try {
    const response = await booking_detail.findAll({
      include: ["booking", "room"],
      where: {
        booking_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
