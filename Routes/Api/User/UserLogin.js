const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../../Middlewares/auth");
const jwtSecret = config.get("jwtSecret");
const Admin = require("../../../Models/admin");

const router = express.Router();

router.post(
  "/",

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

router.post("/adminlogin", async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  let { username, password } = req.body;
  try {
    let user = await Admin.findOne({ username: "admin" });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "From collection Invalid Credentials" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    let verifycredentials;
    if (password == user.password) {
      verifycredentials = true;
    }

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
});

router.get("/", auth, async (req, res) => {
  const userid = req.user.id;

  try {
    let user = await User.findOne({ _id: userid });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    return res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: "Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      res.json(users);
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
