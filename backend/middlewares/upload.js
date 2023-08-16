const multer = require("multer");
const path = require("path");

const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/user");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const storageRoomType = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/roomtype");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const uploadUser = multer({ storage: storageUser });
const uploadRoomType = multer({ storage: storageRoomType });

module.exports = {
  uploadUser,
  uploadRoomType,
};
