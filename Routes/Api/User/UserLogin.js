const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const jwtSecret = config.get("jwtSecret");

const router = express.Router();

router.post(
  "/",
  [
    check("email", "Please Enter A Valid Email Address").isEmail(),
    check("password", "Password Is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      let verifycredentials = await bcrypt.compare(password, user.password);
      if (!verifycredentials) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) {
          return res.status(400).json({ msg: "Token Not Generated" });
        } else {
          return res.send({ user, token });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
