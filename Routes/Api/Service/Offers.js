const express = require("express");

const auth = require("../../../Middlewares/auth");
const RequestedServices = require("../../../Models/Services/RequestService");
// const RequestService = require("../../../../Models/Services/RequestService");
const Offers = require("../../../Models/Services/Offers");
const BookService = require("../../../Models/Services/BookService");

const router = express.Router();
router.post("/", auth, async (req, res) => {
  const {
    serviceprice,
    serviceproposal,
    contactnumber,
    serviceduration,
    requestedserviceid,
  } = req.body;
  const user = req.user.id;

  const offerDetails = {
    user,
    serviceprice,
    contactnumber,
    serviceproposal,
    serviceduration,
  };

  //   console.log("Request Details" + JSON.stringify(requestDetails));
  try {
    const offer = new Offers({
      requestedService: requestedserviceid,
      offers: offerDetails,
    });
    await offer.save();
    // console.log("After Saving" + service);
    return res.status(200).json(offer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:requestedserviceid", async (req, res) => {
  try {
    const service = await Offers.find({
      requestedService: req.params.requestedserviceid,
    }).populate("offers.user");

    if (!service) {
      return res.status(500).json({ msg: "Service Not Found" });
    }
    return res.json(service);
  } catch (err) {
    console.error(err.message);
    return res.status(400).send("Server Error");
  }
});

router.get("/seedetails/:requestedserviceid", async (req, res) => {
  try {
    const service = await RequestedServices.find({
      _id: req.params.requestedserviceid,
    }).populate("user");

    if (!service) {
      return res.status(500).json({ msg: "Service Not Found" });
    }
    return res.json(service);
  } catch (err) {
    console.error(err.message);
    return res.status(400).send("Server Error");
  }
});

router.post("/acceptoffer", auth, async (req, res) => {
  const {
    requestedserviceid, //
    serviceproviderid, //
  } = req.body;

  const user = req.user.id;

  try {
    const requestedServiceDetails = await RequestedServices.findOne({
      _id: requestedserviceid,
    }).populate("user");

    const servicedeleted = await RequestedServices.findOneAndDelete({
      _id: requestedserviceid,
    }).populate("user");

    if (!servicedeleted) {
      return res
        .status(500)
        .json({ msg: "There is an error in deleted requested service" });
    }
    if (!requestedServiceDetails) {
      return res
        .status(500)
        .json({ msg: "There is an error in booking service" });
    }
    const serviceproviderOfferDetails = await Offers.findOne({
      requestedService: requestedserviceid,
      offers: { $elemMatch: { user: serviceproviderid } },
    });
    let serviceprovidercontactnumber;
    let offerprice;
    console.log(
      serviceproviderOfferDetails.offers.map((item) => {
        // console.log("ServiceProvider CN" + item.contactnumber);
        serviceprovidercontactnumber = item.contactnumber;
        offerprice = item.serviceprice;
      })
    );

    const serviceDetails = {
      clientname: requestedServiceDetails.user.name,
      servicecategory: requestedServiceDetails.servicecategory,
      address: requestedServiceDetails.address,
      clientcontactnumber: requestedServiceDetails.contactnumber,
      pinLocation: requestedServiceDetails.pinLocation,
      servicetitle: requestedServiceDetails.servicetitle,
      servicedescription: requestedServiceDetails.servicedescription,
      serviceimages: requestedServiceDetails.imageUrls,
    };

    const bookService = {
      user,
      serviceId: requestedserviceid,
      serviceproviderId: serviceproviderid,
      servicecategory: serviceDetails.servicecategory,
      name: serviceDetails.clientname,
      address: serviceDetails.address,
      contactnumber: serviceDetails.clientcontactnumber,
      pinLocation: serviceDetails.pinLocation,
      servicetitle: serviceDetails.servicetitle,
      servicedescription: serviceDetails.servicetitle,
      serviceprovidercontactnumber: serviceprovidercontactnumber,
      offerprice,
      serviceimages: serviceDetails.serviceimages,
    };

    const service = new BookService(bookService);
    await service.save();

    res.json(service);

    // console.log(requestedServiceDetails);
    // console.log(clientname2);
    // console.log(clientname2);

    // const service = await RequestService.find().populate("user");

    // if (!service) {
    //   return res.status(500).json({ msg: "Services Not Found" });
    // }
    // return res.json(service);
  } catch (err) {
    console.error(err.message);
    return res.status(400).send("Server Error");
  }
});

// router.delete("/:service_id", async (req, res) => {
//   try {
//     const service = await RequestService.findByIdAndDelete(
//       req.params.service_id
//     );

//     if (!service) {
//       return res.status(500).json({ msg: "Service Not Found" });
//     }
//     return res.status(200).json({ msg: "Service Deleted" });
//   } catch (err) {
//     return res.status(400).send("Server Error");
//   }
// });

module.exports = router;
