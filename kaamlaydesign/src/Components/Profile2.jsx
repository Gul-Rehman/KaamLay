import React, { useContext } from "react";
import LoginContext from "../Contexts/LoginContext";

const Profile2 = () => {
  const { username, setUserName } = useContext(LoginContext);
  //   setUserName("Context Here Gul Rehman");
  return (
    <>
      <h1>Profile</h1>
      <h2>Username:{username}</h2>
    </>
  );
};

export default Profile2;
