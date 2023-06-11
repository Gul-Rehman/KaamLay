const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../Middlewares/auth");
const Service = require("../../../Models/Service");
const BookService = require("../../../Models/Services/BookService");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const {
    servicecategory,
    contactnumber,
    name,
    address,
    serviceproviderId,
    serviceId,
    pinLocation,
  } = req.body;
  const bookingDetails = {
    servicecategory,
    name,
    contactnumber,
    address,
    serviceId,
    serviceproviderId,
    pinLocation,
  };
  console.log(bookingDetails);
  bookingDetails.user = req.user.id;
  //   bookingDetails.serviceprovider=req.body
  try {
    const service = new BookService(bookingDetails);
    await service.save();

    console.log("After Saving" + service);
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
        path: "serviceId",
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

router.get("/:user_id", async (req, res) => {
  try {
    const service = await BookService.find({
      user: req.params.user_id,
    })
      .populate("user", ["name", "avatar"])
      // .populate("status", "status");
      // .populate("serviceprovider");
      .populate({
        path: "serviceId",
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

router.get("/getclientpendingservices/:user_id", async (req, res) => {
  try {
    const service = await BookService.find({
      user: req.params.user_id,
      status: "pending",
    })
      .populate("user", ["name", "avatar"])
      // .populate("status", "status");
      // .populate("serviceprovider");
      .populate({
        path: "serviceId",
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

router.get("/getclientcompletedservices/:user_id", async (req, res) => {
  try {
    const service = await BookService.find({
      user: req.params.user_id,
      status: "completed",
    })
      .populate("user", ["name", "avatar"])
      // .populate("status", "status");
      // .populate("serviceprovider");
      .populate({
        path: "serviceId",
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

router.get(
  "/getserviceproviderpendingservices/:serviceproviderId",
  async (req, res) => {
    try {
      const bookedServices = await BookService.find({
        serviceproviderId: req.params.serviceproviderId,
        status: "pending",
      })
        .populate({
          path: "serviceId",
          populate: {
            path: "user",
            model: "user",
          },
        })
        .populate("user");
      if (!bookedServices) {
        return res.json({ msg: "No Services Found" });
      }
      res.json(bookedServices);
    } catch (error) {
      console.error("Error retrieving booked services:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.get(
  "/getserviceprovidercompletedservices/:serviceproviderId",
  async (req, res) => {
    try {
      const bookedServices = await BookService.find({
        serviceproviderId: req.params.serviceproviderId,
        status: "completed",
      })
        .populate({
          path: "serviceId",
          populate: {
            path: "user",
            model: "user",
          },
        })
        .populate("user");
      if (!bookedServices) {
        return res.json({ msg: "No Services Found" });
      }
      res.json(bookedServices);
    } catch (error) {
      console.error("Error retrieving booked services:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.delete("/:service_id", async (req, res) => {
  try {
    const serviceId = req.params.service_id;
    const service = await BookService.findByIdAndDelete(serviceId);

    if (!service) {
      return res.status(404).json({ msg: "Service Not Found" });
    }

    return res.json({ msg: "Service Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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

router.get("/", async (req, res) => {
  // const userid = req.user.id;
  try {
    // const user = User.findOne({ user: userid });
    // if (!user) {
    //   res.json({ msg: "User Not Found" });
    // }
    const services = await Service.find().populate({
      path: "user",
    });

    if (services) {
      return res.json(services);
    }
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = router;
