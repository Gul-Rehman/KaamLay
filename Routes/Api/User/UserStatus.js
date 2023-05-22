const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../Middlewares/auth");

const router = express.Router();

router.post(
  "/",
  auth,
  [check("status", "Please Enter A Status").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const status = req.body.status;
    const userStatus = {
      status,
    };
    userStatus.user = req.user.id;
    try {
      let userstatus = await UserStatus.findOne({ user: req.user.id });
      if (userstatus) {
        userstatus = await UserStatus.findOneAndUpdate(
          { user: req.user.id },
          { $set: userStatus },
          {
            new: true,
          }
        );
        return res.json(userstatus);
      }
      // const userstatus= await UserStatus.fineOne({})
      userstatus = new UserStatus(userStatus);
      await userstatus.save();
      return res.status(200).json(userstatus);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:user_id", async (req, res) => {
  try {
    const userstatus = await UserStatus.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!userstatus) {
      return res.status(500).json({ msg: "Status Not Found" });
    }
    return res.json(userstatus);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Profile Not Found" });
    }
    res.status(400).send("Server Error");
  }
});
router.get("/users", async (req, res) => {
  try {
    const userstatus = await UserStatus.find();
    // .populate("user", [
    //   "name",
    //   "avatar",
    // ]);
    if (!userstatus) {
      return res.status(500).json({ msg: "Status Not Found" });
    }
    return res.json(userstatus);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Profile Not Found" });
    }
    res.status(400).send("Server Error");
  }
});

module.exports = router;
