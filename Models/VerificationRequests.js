const mongoose = require("mongoose");

const verificationrequestsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
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

module.exports = mongoose.model(
  "verificationrequests",
  verificationrequestsSchema
);
