const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../Models/User");
const UserStatus = require("../../../Models/UserStatus");
const auth = require("../../../Middlewares/auth");
const Service = require("../../../Models/Service");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

//Service Add API
router.post("/", auth, upload.single("image"), async (req, res) => {
  const {
    servicetitle,
    servicedescription,
    servicecategory,
    contactnumber,
    price,
  } = req.body;
  const imageUrl = req.file.path;
  const serviceDetails = {
    servicetitle,
    servicecategory,
    servicedescription,
    contactnumber,
    price,
    imageUrl,
  };

  serviceDetails.user = req.user.id;

  console.log(req.body, req.file);
  try {
    const service = new Service(serviceDetails);
    await service.save();
    return res.status(200).json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Service Delete API
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find the service to be deleted
    const service = await Service.findOneAndDelete({ _id: req.params.id });
    // Check if the service exists
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    // Create a new DeletedService instance with the same data as the service being deleted
    // const deletedService = new DeletedService({
    //   servicetitle: service.servicetitle,
    //   servicecategory: service.servicecategory,
    //   servicedescription: service.servicedescription,
    //   contactnumber: service.contactnumber,
    //   price: service.price,
    //   imageUrl: service.imageUrl,

    //   // Set the deletion timestamp
    // });

    // Save the deleted service
    // await deletedService.save();

    // Remove the service from the Service collection
    // await service.remove();

    res.json({ msg: "Service deleted successfully" });
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
