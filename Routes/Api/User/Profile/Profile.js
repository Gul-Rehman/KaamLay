const express = require("express");
const { check, validationResult } = require("express-validator");
// const User = require("../../../Models/User");
// const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../../Middlewares/auth");
// const Service = require("../../../Models/Service");
const multer = require("multer");
const upload = multer({ dest: "profile/" });
const Profile = require("../../../../Models/Profile");
const User = require("../../../../Models/User");
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
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: serviceDetails.user },
        { $set: serviceDetails },
        { new: true }
      );
      User.findOneAndUpdate(
        { _id: serviceDetails.user },
        { $set: { "profile.profilepicture": profile.profilepicture } }, // Assign the profile picture value to the user's profilePicture field
        { upsert: true },
        (err, user) => {
          if (err) {
            console.error(err);
            return;
          }

          // return res.json(user);
          // console.log("User profile picture updated successfully");
        }
      );
    } else {
      profile = new Profile(serviceDetails);
      await profile.save();
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
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
