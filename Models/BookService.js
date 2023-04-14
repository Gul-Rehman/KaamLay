const mongoose = require("mongoose");
const Service = require("./Service");

const bookserviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userstatus",
  },
  serviceprovider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services",
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bookservices", bookserviceSchema);
