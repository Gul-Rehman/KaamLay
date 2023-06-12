const mongoose = require("mongoose");

const offersSchema = new mongoose.Schema({
  requestedService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "requestedservices",
  },
  offers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      serviceprice: {
        type: String,
        required: true,
      },
      contactnumber: {
        type: String,
        required: true,
      },
      serviceproposal: {
        type: String,
        required: true,
      },
      serviceduration: {
        type: String,
        required: true,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("offers", offersSchema);
