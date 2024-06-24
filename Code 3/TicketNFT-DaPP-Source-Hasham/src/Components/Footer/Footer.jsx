import { Box, Typography, IconButton } from "@mui/material";
import React from "react";
import Twitter from "../../assets/Twitter.png";
import Facebook from "../../assets/Facebook.png";
import Instagram from "../../assets/Instagram.png";
import Tumblr from "../../assets/Tumblr.png";
import Telegram from "../../assets/Telegram.png";

const Footer = () => {
  const handleLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <Box
        className="footer"
        sx={{
          backgroundColor: "hsl(0, 0%, 100%)",
          display: "flex",
          padding: "20px 0",
          color: "hsl(269, 93%, 58%)",
          justifyContent: "space-between",
          fontFamily: "'Roboto', sans-serif;",
          width: "100%",
          position: "absolute",
          bottom: "0",
        }}
      >
        <Box
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 auto",
            width: "95%",
            maxWidth: "1500px",
          }}
        >
          <Typography sx={{ width: "40%" }}>Copyrights ©️ NiFTigram</Typography>
          <Box
            sx={{
              display: "flex",
              width: "50%",
              maxWidth: "200px",
              justifyContent: "space-between",
            }}
          >
            <a href="#">
              <img
                src={Twitter}
                onClick={() => handleLink("https://twitter.com/niftigram")}
                style={{ width: "25px" }}
                alt="Twitter"
                srcSet={Twitter}
              />
            </a>
            <a
              onClick={() =>
                handleLink("https://www.facebook.com/Niftigram-108742775047982")
              }
              href="#"
            >
              <img
                src={Facebook}
                style={{ width: "25px" }}
                alt="Facebook"
                srcSet={Facebook}
              />
            </a>
            <a href="#">
              <img
                src={Instagram}
                onClick={() =>
                  handleLink("https://www.instagram.com/niftigram_official/")
                }
                style={{ width: "25px" }}
                alt="Instagram"
                srcSet={Instagram}
              />
            </a>
            <a href="#">
              <img
                src={Telegram}
                onClick={() => handleLink("https://t.me/NiFTigram_Portal")}
                style={{ width: "25px" }}
                alt="Telegram"
                srcSet={Telegram}
              />
            </a>
            <a href="#">
              <img
                src={Tumblr}
                onClick={() =>
                  handleLink(
                    "https://www.youtube.com/channel/UCcB3XCoz6b77wIWJuV6neNA?_ga=2.204116752.1479212086.1659630434-867673995.1659630434"
                  )
                }
                style={{ width: "25px" }}
                alt="Youtube"
                srcSet={Tumblr}
              />
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
