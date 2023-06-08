const express = require("express");

const auth = require("../../../../Middlewares/auth");

const RequestService = require("../../../../Models/Services/RequestService");

const multer = require("multer");
const { findById } = require("../../../../Models/User");

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
router.post("/", auth, upload.array("files"), async (req, res) => {
  const {
    servicetitle,
    contactnumber,
    servicedescription,
    servicecategory,
    address,
    pinLocation,
  } = req.body;
  const imageUrls = [];
  req.files.map((item) => imageUrls.push(item.path));

  const requestDetails = {
    servicetitle,
    contactnumber,
    servicedescription,
    servicecategory,
    address,
    imageUrls,
  };
  requestDetails.pinLocation = JSON.parse(pinLocation);
  requestDetails.user = req.user.id;
  requestDetails.profile = req.user.id;

  //   console.log("Request Details" + JSON.stringify(requestDetails));
  try {
    const service = new RequestService(requestDetails);
    await service.save();
    // console.log("After Saving" + service);
    return res.status(200).json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const service = await RequestService.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar", "profile"]);
    // .populate("status", "status");

    if (!service) {
      return res.status(500).json({ msg: "Service Not Found" });
    }
    return res.json(service);
  } catch (err) {
    console.error(err.message);
    return res.status(400).send("Server Error");
  }
});

router.get("/allservices", async (req, res) => {
  try {
    const service = await RequestService.find();

    if (!service) {
      return res.status(500).json({ msg: "Services Not Found" });
    }
    return res.json(service);
  } catch (err) {
    console.error(err.message);
    return res.status(400).send("Server Error");
  }
});

router.delete("/:service_id", async (req, res) => {
  try {
    const service = await RequestService.findByIdAndDelete(
      req.params.service_id
    );

    if (!service) {
      return res.status(500).json({ msg: "Service Not Found" });
    }
    return res.status(200).json({ msg: "Service Deleted" });
  } catch (err) {
    return res.status(400).send("Server Error");
  }
});

// router.delete("/:service_id", async (req, res) => {
//   try {
//     const serviceId = req.params.service_id;
//     const service = await BookService.findByIdAndDelete(serviceId);

//     if (!service) {
//       return res.status(404).json({ msg: "Service Not Found" });
//     }

//     return res.json({ msg: "Service Deleted" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// router.get("/serviceproviders/:user_id", async (req, res) => {
//   try {
//     // const { id } = req.body;
//     const service = await BookService.find({
//       serviceprovider: req.params.user_id,
//     }).populate("serviceprovider", ["name", "avatar"]);
//     // .populate("user", ["name", "avatar"])
//     if (!service) {
//       return res.status(500).json({ msg: "Service Providers Not Found" });
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

// router.get("/", async (req, res) => {
//   // const userid = req.user.id;
//   try {
//     // const user = User.findOne({ user: userid });
//     // if (!user) {
//     //   res.json({ msg: "User Not Found" });
//     // }
//     const services = await Service.find().populate({
//       path: "user",
//     });

//     if (services) {
//       return res.json(services);
//     }
//   } catch (err) {
//     return res.send(err.message);
//   }
// });

module.exports = router;
