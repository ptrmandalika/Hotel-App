var router = require("express").Router();
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const user = require("../models/index").user;
const { uploadUser } = require("../middlewares/upload");
const { mustLogin, mustAdmin } = require("../middlewares/auth");
const SECRET_KEY = "mORPqZhHAo";

// Get all users
router.get("/user", mustLogin, async (req, res) => {
  try {
    const response = await user.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get user by id
router.get("/user/:id", mustLogin, mustAdmin, async (req, res) => {
  try {
    const response = await user.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Create user
router.post(
  "/user",
  mustLogin,
  mustAdmin,
  uploadUser.single("photo"),
  async (req, res) => {
    let finalImageURL =
      req.protocol + "://" + req.get("host") + "/user/" + req.file.filename;

    let data = {
      username: req.body.username,
      photo: finalImageURL,
      email: req.body.email,
      password: sha256(req.body.password),
      role: req.body.role,
    };

    try {
      await user.create(data);
      res.status(201).json({ msg: "User Created" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
);

// Update user
router.put(
  "/user/:id",
  mustLogin,
  mustAdmin,
  uploadUser.single("photo"),
  async (req, res) => {
    let params = { user_id: req.params.id };

    let data = {
      username: req.body.username,
      email: req.body.email,
      password: sha256(req.body.password),
      role: req.body.role,
    };

    if (req.file) {
      let oldImg = await user.findOne({ where: params });
      let oldImgName = oldImg.photo.replace(
        req.protocol + "://" + req.get("host") + "/user/",
        ""
      );
      let loc = path.join(__dirname, "../public/user", oldImgName);
      fs.unlink(loc, (error) => console.log(error));
      let finalImageURL =
        req.protocol + "://" + req.get("host") + "/user/" + req.file.filename;
      data.photo = finalImageURL;
    }

    try {
      await user.update(data, { where: params });
      res.status(201).json({ msg: "User Updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
);

// Delete user
router.delete("/user/:id", mustLogin, mustAdmin, async (req, res) => {
  let params = { user_id: req.params.id };

  let delImg = await user.findOne({ where: params });
  if (delImg) {
    let delImgName = delImg.photo.replace(
      req.protocol + "://" + req.get("host") + "/user/",
      ""
    );
    let loc = path.join(__dirname, "../public/user", delImgName);
    fs.unlink(loc, (error) => console.log(error));
  }

  try {
    await user.destroy({ where: params });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  let params = {
    email: req.body.email,
    password: sha256(req.body.password),
  };

  await user
    .findOne({ where: params })
    .then((result) => {
      if (result) {
        let payload = JSON.stringify(result);
        let token = jwt.sign(payload, SECRET_KEY);
        res
          .status(200)
          .json({ msg: "Login success!", data: result, token: token });
      } else {
        res.status(400).json({ msg: "Invalid email or password!" });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;
