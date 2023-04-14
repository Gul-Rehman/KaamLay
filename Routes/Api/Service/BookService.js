const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../Middlewares/auth");
const Service = require("../../../Models/Service");
const BookService = require("../../../Models/BookService");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { servicecategory, contactnumber, name, address, serviceprovider } =
    req.body;
  const bookingDetails = {
    servicecategory,
    name,
    contactnumber,
    address,
    serviceprovider,
  };
  bookingDetails.user = req.user.id;
  //   bookingDetails.serviceprovider=req.body
  try {
    const service = new BookService(bookingDetails);
    await service.save();
    return res.status(200).json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const service = await BookService.find({
      user: req.params.user_id,
    })
      .populate("user", ["name", "avatar"])
      // .populate("status", "status");
      // .populate("serviceprovider");
      .populate({
        path: "serviceprovider",
        populate: [
          {
            path: "user",
          },
        ],
      });
    if (!service) {
      return res.status(500).json({ msg: "Service Not Found" });
    }
    return res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).json({ msg: "Service Not Found" });
    }
    res.status(400).send("Server Error");
  }
});

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

module.exports = router;
