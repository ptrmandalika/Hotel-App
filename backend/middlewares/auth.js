const jwt = require("jsonwebtoken");
const SECRET_KEY = "mORPqZhHAo";

const mustAdmin = (req, res, next) => {
  const role = req.user?.role;

  if (!role || role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  next();
};

mustLogin = (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: err.message });

    req.user = decoded;
    next();
  });
};

const auth = (req, res, next) => {
  let header = req.headers.authorization;
  let token = header && header.split(" ")[1];

  let jwtHeader = {
    algorithm: "HS256",
  };

  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, jwtHeader, (err, usr) => {
    if (err) return res.status(401).json({ message: "Invalid Token" });

    req.user = usr;
    console.log(req.user);
    next();
  });
};

module.exports = {
  auth,
  mustAdmin,
  mustLogin,
};
