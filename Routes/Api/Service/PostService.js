const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../Middlewares/auth");
const Service = require("../../../Models/Service");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const {
    servicetitle,
    servicedescription,
    servicecategory,
    contactnumber,
    price,
  } = req.body;
  const serviceDetails = {
    servicetitle,
    servicecategory,
    servicedescription,
    contactnumber,
    price,
  };
  serviceDetails.user = req.user.id;
  try {
    const service = new Service(serviceDetails);
    await service.save();
    return res.status(200).json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const service = await Service.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!service) {
      return res.status(500).json({ msg: "Status Not Found" });
    }
    return res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Profile Not Found" });
    }
    res.status(400).send("Server Error");
  }
});

router.get("/servicecategory/:type", async (req, res) => {
  try {
    const service = await Service.find({
      servicecategory: req.params.type,
    }).populate("user", ["name", "avatar"]);
    if (!service) {
      return res.status(500).json({ msg: "Status Not Found" });
    }
    return res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Profile Not Found" });
    }
    res.status(400).send("Server Error");
  }
});

module.exports = router;
