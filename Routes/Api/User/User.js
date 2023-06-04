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

const router = express.Router();

router.delete("/:user_id", async (req, res) => {
  try {
    const userId = req.params.service_id;
    const user = await User.findByIdAndDelete(userId);

    if (user) {
      await Service.findByIdAndDelete({ user: userId });
      await Profile.findByIdAndDelete({ user: userId });
      await BookService.findByIdAndDelete({ user: userId });
      await UserStatus.findByIdAndDelete({ user: userId });
    }

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    return res.json({ msg: "Service Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
