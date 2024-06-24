import React, { useState, useEffect } from "react";
import "./header.css";
import LOGO_ONE from "./icons/logo.png";
const Header = () => {
  const [imgAddress, setImage] = useState(LOGO_ONE);

  return (
    <>
     

      <div className="NavBar">
        <div className="container">
          <img src={imgAddress} width="auto" height="50px" />

          <div className="navbar_link">
            <a href="google.com">Home</a>
            <a href="google.com">Game Rule</a>
            <a href="google.com">Stats Page</a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;
