const mongoose = require("mongoose");

const requestserviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  servicetitle: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: String,
    required: true,
  },
  servicedescription: {
    type: String,
    required: true,
  },
  imageUrls: [
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

module.exports = mongoose.model("requestedservices", requestserviceSchema);
