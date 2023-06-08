const jwt = require("jsonwebtoken");
const config = require("config");
const secretKey = config.get("jwtSecret");

const adminAuth = async (req, res, next) => {
  const token = req.header("adminauthtoken");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "There is no token, Authorization Failed" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = adminAuth;
