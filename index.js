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
app.use("/user/deleteuser", require("./Routes/Api/User/User"));
app.use("/api/file", require("./Routes/Api/Service/PostService"));
app.use("/api/user/register", require("./Routes/Api/User/UserRegistration"));
app.use("/api/user/login", require("./Routes/Api/User/UserLogin"));
app.use("/api/admin", require("./Routes/Api/User/UserLogin"));
app.use("/api/user/getusers", require("./Routes/Api/User/UserLogin"));
app.use("/api/getuser", require("./Routes/Api/User/UserLogin"));
// app.use("/api/", require("./Routes/Api/User/UserStatus"));
app.use("/api/welcome", require("./Routes/Api/welcome"));
app.use("/api/userstatus", require("./Routes/Api/User/UserStatus"));
app.use("/api/service", require("./Routes/Api/Service/PostService"));
app.use(
  "/api/service/requestservice",
  require("./Routes/Api/Service/Client/RequestService")
);
// app.use(
//   "/api/service/requestservice/",
//   require("./Routes/Api/Service/Client/RequestService")
// );
app.use(
  "/api/service/requestedservices",
  require("./Routes/Api/Service/Client/RequestService")
);
app.use(
  "/api/service/deleteservice",
  require("./Routes/Api/Service/PostService")
);
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
app.use("/api/queries", require("./Routes/Api/Queries/Queries"));
app.use("/api/offer", require("./Routes/Api/Service/Offers"));

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.listen(PORT, () => {
  console.log(`Your Server Is Running On PORT ${PORT}`);
});
