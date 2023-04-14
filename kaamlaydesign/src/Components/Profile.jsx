import React, { useState } from "react";
import Login from "./Login";
import Profile2 from "./Profile2";
import LoginContext from "../Contexts/LoginContext";

const Profile = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [username, setUserName] = useState("Context Username Gul Rehman");
  const data = {
    username,
    showProfile,
    setShowProfile,
    setUserName,
  };
  return (
    <>
      <LoginContext.Provider value={data}>
        {showProfile ? <Profile2 /> : <Login />}
      </LoginContext.Provider>
    </>
  );
};

export default Profile;
