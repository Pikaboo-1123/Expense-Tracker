const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "No token",
    });
  }

  try {

    const decoded = jwt.verify(token, "mysecretkey");

    req.user = decoded.user.id;

    next();

  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};