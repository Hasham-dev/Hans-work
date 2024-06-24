import React, { useEffect, useState } from "react";
import { Box, Card, Button, Typography } from "@mui/material";
import Ticket from "../../assets/Ticket.gif";
import TKT from "../../../ABI/TKT.json";
import { ethers } from "ethers";

const TKT_CONTRACT_ADDRESS = "0xece289B8128caCe172fdf993F7731227746FF41F";
const provider =
  window.ethereum != null && new ethers.providers.Web3Provider(window.ethereum);

// get end user's account
const signer = window.ethereum != null && provider.getSigner();

const contract =
  window.ethereum != null &&
  new ethers.Contract(TKT_CONTRACT_ADDRESS, TKT, signer);

const metadataURI =
  "https://gateway.pinata.cloud/ipfs/QmctpZp2XbfwvGuNSZsYyAYQKWU6DymRimKpTa92ajFx26";

const MintTKT = ({ active }) => {
  const [isMinted, setIsMinted] = useState(false);

  const getMintedStatus = async () => {
    const result = await contract.ownerOf(metadataURI);
    setIsMinted(result);
  };

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const mintTKTbtnClickHandler = async () => {
    try {
      const connection = contract.connect(signer);
      const addr = connection.address;
      const result = await contract.create(metadataURI, {
        value: ethers.utils.parseEther("0.5"),
      });
      await result.wait();
      console.log("Minted", result.toString());
      getMintedStatus();
    } catch (error) {
      if (!active) {
        alert("Wallet is not Connected");
        return;
      }
      if (isMinted) {
        alert("Already minted to this wallet");
      } else {
        alert(error.data.message);
      }
    }
  };

  return (
    <>
      <button onClick={mintTKTbtnClickHandler} className="neon-button">
        Mint 3 Meme Card
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
            src={Ticket}
            width="300px"
            height="250px"
            alt="Ticket"
            srcSet={Ticket}
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
              1 TICKET = 0.5 BNB
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
              (MAX 1 TICKET PER WALLET)
            </Typography>
          </Box>
        </Card>
        <Button
          onClick={mintTKTbtnClickHandler}
          className="neon-button"
          style={{
            display: "flex",
            color: "#fff",
            fontSize: "12px",
            border: "2px solid rgba(255, 255, 255, .6)",
            width: "100%",
            maxWidth: "300px",
            padding: "10px 20px",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "700",
            backgroundColor: "rgba(255,255,255,0.2)",
            textTransform: "capitalize",
            margin: "20px auto",
            "&:hover": {
              backgroundImage:
                "linear-gradient(90deg, #2a2c58, #000,) !important",
            },
          }}
        >
          MINT TICKET
        </Button>
      </Box> */}
    </>
  );
};
export default MintTKT;

// const MintTKT =
// //     run()
// // }
