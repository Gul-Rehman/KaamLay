const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../Middlewares/auth");
const Service = require("../../../Models/Service");
const multer = require("multer");
const VerificationRequests = require("../../../Models/VerificationRequests");
const Cnics = require("../../../Models/Cnics");
const mongoose = require("mongoose");

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "cnics/"); // specify the destination folder where files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix); // define the file name
  },
});
// const upload = multer({ dest: "profile/" });
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/multiplefiles", upload.array("files"), (req, res) => {
  // res.redirect("/");

  const imageurl = req.files.map((file) => file.path);

  res.json(imageurl);
});

router.post("/", auth, upload.array("files"), async (req, res) => {
  //   const {
  //     servicetitle,
  //     servicedescription,
  //     servicecategory,
  //     contactnumber,
  //     price,
  //   } = req.body;
  const imageUrls = [];
  req.files.map((item) => imageUrls.push(item.path));
  // const imageUrls = req.files.map((file) => file.path);
  // console.log("Input received  from frontend:" + req.files);
  const details = {
    // servicetitle,
    // servicecategory,
    // servicedescription,
    // contactnumber,
    // price,
    imageUrls,
  };

  details.user = req.user.id;
  console.log(details);
  // console.log(req.body, req.file);
  try {
    const user = await VerificationRequests.findOne({ user: req.user.id });
    if (user) {
      const request = await VerificationRequests.findOneAndUpdate(
        { user: req.user.id },
        { $set: { imageUrls: details.imageUrls } },
        { returnOriginal: false }
      );
      return res.status(200).json(request);
    }
    const request = new VerificationRequests(details);
    await request.save();

    return res.status(200).json(request);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const details = await VerificationRequests.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "profile"]);
    if (!details) {
      return res.status(500).json({ msg: "Status Not Found" });
    }
    return res.json(details);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Profile Not Found" });
    }
    res.status(400).send("Server Error");
  }
});

router.post("/acceptverification/:user_id", async (req, res) => {
  try {
    const details = await VerificationRequests.find({
      user: req.params.user_id,
    }).populate("user", ["name", "profile"]);
    if (!details) {
      return res.status(500).json({ msg: "Status Not Found" });
    }

    await User.findOneAndUpdate(
      { _id: req.params.user_id },
      { $set: { verification: true } },
      { upsert: true, returnOriginal: false }
    );
    const imageUrls = [];

    details.map((item) => {
      item.imageUrls.map((item) => {
        imageUrls.push(item);
      });
    });
    console.log("obtained Url" + imageUrls);
    const newDetails = {
      user: req.params.user_id,
      imageUrls,
    };

    const user = await Cnics.findOne({ user: req.params.user_id });
    if (user) {
      const request = await Cnic.findOneAndUpdate(
        { user: req.user.id },
        { $set: { imageUrls: details.imageUrls } },
        { returnOriginal: false }
      );
      return res.status(200).json(request);
    }

    const cnics = new Cnics(newDetails);
    const saveCnics = await cnics.save();
    if (saveCnics) {
      const details = await VerificationRequests.findOneAndDelete({
        user: req.params.user_id,
      }).populate("user", ["name", "profile"]);
    }
    return res.json(cnics);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Profile Not Found" });
    }
    res.status(400).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const details = await VerificationRequests.find().populate("user", [
      "name",
      "profile",
    ]);
    if (!details) {
      return res.status(500).json({ msg: "Request Not Found" });
    }
    return res.json(details);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Request Not Found" });
    }
    res.status(400).send("Server Error");
  }
});

// router.get("/servicecategory/:type", async (req, res) => {
//   try {
//     const service = await Service.find({
//       servicecategory: req.params.type,
//     }).populate("user", ["name", "profile"]);
//     if (!service) {
//       return res.status(500).json({ msg: "Status Not Found" });
//     }
//     return res.json(service);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == "ObjectId") {
//       return res.status(500).json({ msg: "Profile Not Found" });
//     }
//     res.status(400).send("Server Error");
//   }
// });

// router.delete("/:service_id", async (req, res) => {
//   try {
//     const serviceId = req.params.service_id;
//     const service = await Service.findByIdAndDelete(serviceId);

//     if (!service) {
//       return res.status(404).json({ msg: "Service Not Found" });
//     }

//     return res.json({ msg: "Service Deleted" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
