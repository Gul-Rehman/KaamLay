const express = require("express");
const User = require("../../../Models/User");
const Queries = require("../../../Models/Queries");
const auth = require("../../../Middlewares/auth");

const router = express.Router();

router.post("/unregistereduser", async (req, res) => {
  const { name, contactNumber, email, message } = req.body;
  const queryData = { name, contactNumber, email, message };
  try {
    const query = new Queries(queryData);
    query.save();

    return res.json({ msg: "Query Submitted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.post("/unregistereduser", auth, async (req, res) => {
  const { contactNumber, message } = req.body;
  const queryData = { name, contactNumber, email, message };
  try {
    const query = new Queries(queryData);
    query.save();

    return res.json({ msg: "Query Submitted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
