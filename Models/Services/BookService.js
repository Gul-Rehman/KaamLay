const mongoose = require("mongoose");
const Service = require("../Service");

const bookserviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userstatus",
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
    },
    serviceproviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    servicecategory: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    contactnumber: {
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
    status: {
      type: String,
      default: "pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("bookservices", bookserviceSchema);
