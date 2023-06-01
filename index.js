const express = require("express");
const config = require("config");
const connectdb = require("./config/db");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

connectdb();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/profile", express.static("profile"));

app.use("/api/user/register", require("./Routes/Api/User/UserRegistration"));
app.use("/api/user/login", require("./Routes/Api/User/UserLogin"));
app.use("/api/user/getusers", require("./Routes/Api/User/UserLogin"));
app.use("/api/getuser", require("./Routes/Api/User/UserLogin"));
// app.use("/api/", require("./Routes/Api/User/UserStatus"));
app.use("/api/welcome", require("./Routes/Api/welcome"));
app.use("/api/userstatus", require("./Routes/Api/User/UserStatus"));
app.use("/api/service", require("./Routes/Api/Service/PostService"));
app.use("/api/getservices", require("./Routes/Api/Service/BookService"));

app.use("/api/profile", require("./Routes/Api/User/Profile/Profile"));
app.use(
  "/api/service/bookservice",
  require("./Routes/Api/Service/BookService")
);
app.use(
  "/api/service/bookservice/cancelservice",
  require("./Routes/Api/Service/BookService")
);

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.listen(PORT, () => {
  console.log(`Your Server Is Running On PORT ${PORT}`);
});
