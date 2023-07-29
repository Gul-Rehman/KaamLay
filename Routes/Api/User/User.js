const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../Middlewares/auth");
const Service = require("../../../Models/Service");
const multer = require("multer");
const Profile = require("../../../Models/Profile");
const BookService = require("../../../Models/Services/BookService");
const upload = multer({ dest: "uploads/" });
const ObjectId = require("mongodb").ObjectId;

const router = express.Router();

router.get("/getuser/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.delete("/deleteuser/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findOneAndDelete({ _id: userId });

    if (user) {
      await Service.findByIdAndDelete({ user: ObjectId(userId) });
      await Profile.findByIdAndDelete({ user: ObjectId(userId) });
      await BookService.findByIdAndDelete({ user: ObjectId(userId) });
      await UserStatus.findByIdAndDelete({ user: ObjectId(userId) });
      await requestedservices.findByIdAndDelete({ user: ObjectId(userId) });
    }

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    return res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
