import React, { useState, useEffect } from "react";
import axios from "axios";

const TotalUsers = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/allusers/users")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div>TotalUsers</div>;
};

export default TotalUsers;
