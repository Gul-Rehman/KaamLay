const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "admin", // the collection to use for this schema
  }
);

module.exports = mongoose.model("admin", adminSchema);
