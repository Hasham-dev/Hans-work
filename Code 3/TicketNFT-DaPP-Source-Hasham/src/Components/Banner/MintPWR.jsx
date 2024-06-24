// import ABI from '../../../ABI/MintTKT.json';
import { Box, Card, Button, Typography } from "@mui/material";
import NiFTi from "../../assets/NiFTi.gif";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import PWR from "../../../ABI/PWR.json";

const PWR_CONTRACT_ADDRESS = "0xBe9f82363eb1491A56C5E93d3312F7c2dcd88fA3";
const provider =
  window.ethereum != null && new ethers.providers.Web3Provider(window.ethereum);

// get end user's account
const signer = window.ethereum != null && provider.getSigner();

const contract =
  window.ethereum != null &&
  new ethers.Contract(PWR_CONTRACT_ADDRESS, PWR, signer);

const metadataURI =
  "https://gateway.pinata.cloud/ipfs/QmPkyTZtzA9q1HwPkH6J7K8nmbVvzq3wD3TPiqXnYb1nYJ";

const MintPWR = ({ active }) => {
  const [isMinted, setIsMinted] = useState(false);

  const getMintedStatus = async () => {
    const result = await contract.ownerOf(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const mintPWRbtnClickHandler = async () => {
     if (!active) {
       alert("Wallet is not Connected");
       return;
     }
    try {
      const connection = contract.connect(signer);
      const addr = connection.address;
      const result = await contract.create(metadataURI, {
        value: ethers.utils.parseEther("0.1"),
      });
      await result.wait();
      console.log("Minted", result.toString());
      getMintedStatus();
    } catch (error) {
     
      if (isMinted) {
        alert("Already minted to this wallet");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <button onClick={mintPWRbtnClickHandler} className="neon-button">
        Mint 1 Meme Card
      </button>

      {/* <Box
        className="mint_box"
        sx={{
          display: "flex",
          width: "40%",
          height: "100%",
          padding: "100px 0",
          flexDirection: "column",
        }}
      >
        <Card
          className="mint_card"
          sx={{
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "300px",
            height: "400px",
            margin: "auto",
            background: "rgba(255, 255, 255,.9)",
            borderRadius: "10px",
          }}
        >
          <img
            src={NiFTi}
            width="300px"
            height="250px"
            alt="Ticket"
            srcSet={NiFTi}
          />
          <Box>
            <Typography
              className="mint_title"
              sx={{
                width: "100%",
                textAlign: "center",
                fontWeight: "900",
                color: "rgb(17 17 17 / 70%)",
                fontSize: "12px",
              }}
            >
              1 POWER UP = 0.1 BNB
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                fontWeight: "800",
                color: "rgb(17 17 17 / 70%)",
                fontSize: "12px",
              }}
            >
              (MAX 5 POWER UP PER WALLET)
            </Typography>
          </Box>
        </Card>
        <button onClick={mintPWRbtnClickHandler} className="neon-button">
          MINT POWER UP
        </button>
      </Box> */}
    </>
  );
};

export default MintPWR;
