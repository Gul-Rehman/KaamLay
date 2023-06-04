const mongoose = require("mongoose");
const Service = require("../Service");

const requestserviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  //   status: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "userstatus",
  //   },
  servicetitle: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: String,
    required: true,
  },
  servicedesciption: {
    type: String,
    required: true,
  },
  imagesUrl: [
    {
      type: String,
      required: true,
    },
  ],
  servicecategory: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  pinLocation: {
    coordinates: {
      latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bookservices", bookserviceSchema);
