import React, { useState, useEffect } from "react";
import "./header.css";
import LOGO_ONE from "./icons/logo.png";
import Facebook from "./icons/facebook.png";
import Instagram from "./icons/instagram.png";
import Telegram from "./icons/telegram.png";
import Tiktok from "./icons/tiktok.png";
import Twitter from "./icons/twitter.png";
import Youtube from "./icons/youtube.png";
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


export const CustomFooter = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <span>Copyright @ CR8R Token 2024</span>
        <div className="social_buttons_container">
          <a href="google.com">
            <img src={Facebook} height="40px" width="40px" />
          </a>
          <a href="google.com">
            <img src={Instagram} height="40px" width="40px" />
          </a>
          <a href="google.com">
            <img src={Telegram} height="40px" width="40px" />
          </a>
          <a href="google.com">
            <img src={Tiktok} height="40px" width="40px" />
          </a>
          <a href="google.com">
            <img src={Twitter} height="40px" width="40px" />
          </a>
          <a href="google.com">
            <img src={Youtube} height="40px" width="40px" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
