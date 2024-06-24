import React, { useState, useEffect } from "react";
import web3 from "./Web3Client";
import "./App.css";
import {
  REACT_APP_WALLET_ADDRESS,
  REACT_APP_CONTRACT_ADDRESS,
} from "../config";
import Header, { Footer } from "./Components/header/header";
import PAGE from './assets/A1.png';


const walletAddress = REACT_APP_WALLET_ADDRESS;
const contractAddress = REACT_APP_CONTRACT_ADDRESS;

const contractABI = [
  {
    constant: true,
    inputs: [],
    name: "getTokenCirculations",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

function App() {
  const [balance, setBalance] = useState("");
  const [nftsSold, setNftsSold] = useState(0);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(walletAddress || accounts[0]);
      const formattedBalance = web3.utils.fromWei(balance, "ether");
      setBalance(Number(formattedBalance).toFixed(5));

      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const circulations = await contract.methods.getTokenCirculations().call();
      setNftsSold(circulations.toString());
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      <Header />
      <div className="content_container">
        <h1>THE MEMES V1 STATS PAGE</h1>
        <div className="paragraph_container">
          <img src={PAGE} />
          <div>
            <p>ALBUM's WALLET: OXNJNKV8UVFV909VUUV</p>
            <p>WALLET BALANCE: {balance} BNB</p>
            <p>- FIRST PALACE CLAIMED: NO</p>
            <p>- SECOND PALACE CLAIMED: NO</p>
            <p>- THIRD PALACE CLAIMED: NO</p>
            <br />
            <p>MEMES V1 NFT CONTRACT: OX92837G48F9D02</p>
            <p>ALBUM'S NFTS SOLD SO FAR: {nftsSold} NFTS</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
