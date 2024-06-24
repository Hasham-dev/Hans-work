import React from "react";
import { Box, Button } from "@mui/material";
import MintTKT from "./MintTKT";
import MintPWR from "./MintPWR";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../../Connectors";
import Aos from "aos";
Aos.init();
import "aos/dist/aos.css";

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const GetDappBtn = () => {
  const { active, activate } = useWeb3React();

  async function btnConnect() {
    try {
      await activate(injected);
      if (
        window?.ethereum.networkVersion === "56" ||
        window?.ethereum.networkVersion === "97"
      ) {
        alert("Connected to wallet");
      } else {
        alert("Use Binance to connect to the wallet");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  if (isMobileDevice()) {
    const dappUrl = "https://mint.niftigram.io/"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button
          className="neon-button"
         
        >
          {active ? `Connected` : "Connect Wallet"}
        </button>
      </a>
    );
  }

  return (
    <button
      onClick={btnConnect}
      className="neon-button"
      // style={{
      //   top: "20px",
      //   right: "0px",
      //   marginRight: "-10px",
      //   position: "absolute",
      // }}
    >
      {active ? `Connected` : "Connect Wallet"}
    </button>
  );
};

const Banner = () => {
  const { active, activate } = useWeb3React();

  return (
    <>
      <Box
        sx={{
          zIndex: 1,
          width: "100%",
          display: "flex",
          mixBlendMode: "flex",
          flexDirection: "column",
        }}
      >
        {/* Wallet Connection Button */}

        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <Box
            sx={{
              display: "flex",
              marginTop: "50px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundSize: "cover",
            }}
          >
            <Box>
              <GetDappBtn />
            </Box>
            <Box
              className="mint_container"
              sx={{
                display: "flex",
                position: "relative",
                width: "95%",
                maxWidth: "1000px",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <div class="description_container">
                <h2>Mint Your Meme Cards</h2>
                <p>
                  Which meme card will you get? There is a total of 100 unique
                  V1 Memes out there. Mint, trade, collect and win!
                </p>
                <p>
                  1st, 2nd and 3rd place that can collect the 100 unique Meme V1
                  NFT cards the fastest will win BiG!
                </p>
                <ul>
                  <li>
                    Mint 1 Meme Card for 0.1 BNB or 3 Meme Cards for 0.25 BNB
                  </li>
                  <li>
                    Must have necessary BNB amount in your wallet in order to
                    work :)
                  </li>
                </ul>
              </div>
              {/* Ticket Card  */}

              {/* <MintTKT active={active} /> */}
              {/* POWER UP  Card */}
              {/* <MintPWR active={active} /> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <MintPWR {...{ active }} />
              <MintTKT {...{ active }} />
            </Box>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Banner;
