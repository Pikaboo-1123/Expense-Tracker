const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    console.log("HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        msg: "No token",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);
    console.log("SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded.user;

    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);

    res.status(401).json({
      msg: "Invalid token",
    });
  }
};