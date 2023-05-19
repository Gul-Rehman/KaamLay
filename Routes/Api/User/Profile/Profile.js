const express = require("express");
const { check, validationResult } = require("express-validator");
// const User = require("../../../Models/User");
// const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../../Middlewares/auth");
// const Service = require("../../../Models/Service");
const multer = require("multer");
const upload = multer({ dest: "profile/" });
const Profile = require("../../../../Models/Profile");

const router = express.Router();

router.post("/", auth, upload.single("image"), async (req, res) => {
  const profilepicture = req.file.path;
  const serviceDetails = {
    // servicetitle,
    // servicecategory,
    // servicedescription,
    // contactnumber,
    // price,
    profilepicture,
  };

  serviceDetails.user = req.user.id;

  console.log(req.body, req.file);
  try {
    const profile = new Profile(serviceDetails);
    await profile.save();
    return res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(500).json({ msg: "Status Not Found" });
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Profile Not Found" });
    }
    res.status(400).send("Server Error");
  }
});

module.exports = router;
