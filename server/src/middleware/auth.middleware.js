const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey"; // Replace with a strong secret in production

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.customer = decoded.customer;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
