const express = require("express");
const { check, validationResult } = require("express-validator");
// const {check, validationResult}= require('express-validator');
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../../Models/User");
const jwtSecret = config.get("jwtSecret");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Please Enter A Valid Name").not().isEmpty(),
    check("email", "Enter A Valid Email Address").isEmail(),
    check("password", "Enter A Password Of Minimum Length 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] });
      }
      console.log(name, email, password);
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });
      console.log(user.id);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      const result = await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) {
          res.send("Cant Proceed Please Try After Some Time");
        } else {
          res.send({ user, token });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server Error");
    }
  }
);

router.post("/login");

module.exports = router;
