const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userstatus",
  },
  profilepicture: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("profile", profileSchema);
