const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = 8000;

const user = require("./routes/user.js");
const room_type = require("./routes/room_type.js");
const room = require("./routes/room.js");
const booking = require("./routes/booking.js");
const booking_detail = require("./routes/booking_detail.js");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(user);
app.use(room_type);
app.use(room);
app.use(booking);
app.use(booking_detail);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT} 🚀`)
);
