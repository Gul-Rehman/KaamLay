const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../Middlewares/auth");
const Service = require("../../../Models/Service");
const multer = require("multer");

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // specify the destination folder where files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix); // define the file name
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/multiplefiles", upload.array("files"), (req, res) => {
  // res.redirect("/");

  const imageurl = req.files.map((file) => file.path);

  res.json(imageurl);
});

router.post("/", auth, upload.array("files"), async (req, res) => {
  const {
    servicetitle,
    servicedescription,
    servicecategory,
    contactnumber,
    price,
  } = req.body;
  const imageUrls = [];
  req.files.map((item) => imageUrls.push(item.path));
  // const imageUrls = req.files.map((file) => file.path);
  // console.log("Input received  from frontend:" + req.files);
  const serviceDetails = {
    servicetitle,
    servicecategory,
    servicedescription,
    contactnumber,
    price,
    imageUrls,
  };

  serviceDetails.user = req.user.id;
  console.log(serviceDetails);
  // console.log(req.body, req.file);
  try {
    
    const service = new Service(serviceDetails);
    await service.save();

    return res.status(200).json(service);
    // return res.status(200).json(serviceDetails);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const service = await Service.find({
      user: req.params.user_id,
    }).populate("user", ["name", "profile"]);
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
    }).populate("user", ["name", "profile"]);
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

router.delete("/:service_id", async (req, res) => {
  try {
    const serviceId = req.params.service_id;
    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) {
      return res.status(404).json({ msg: "Service Not Found" });
    }

    return res.json({ msg: "Service Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
