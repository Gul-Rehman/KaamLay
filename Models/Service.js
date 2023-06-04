const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  serivceprovider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userstatus",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  servicecategory: {
    type: String,
    required: true,
  },
  servicetitle: {
    type: String,
    required: true,
  },
  servicedescription: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: String,
    required: true,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("services", serviceSchema);
