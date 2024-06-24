import React, { useState } from 'react'
import './button.css'
import { ethers } from "ethers";
import ClaimButton from './ClaimButton';

const WalletButtons = () => {
     const [address, setaddress] = useState(0);
     const connect = async () => {
       const provider = new ethers.providers.Web3Provider(
         window.ethereum,
         "any"
       );
       // Prompt user for account connections
       await provider.send("eth_requestAccounts", []);
       const signer = provider.getSigner();
       const add = await signer.getAddress();
       setaddress(add);
     };
    return (
      <div className="button_container">
        <a href='google.com'>

        <button className="neon_button">Mint Cards</button>
        </a>
        <button className="neon_button" onClick={connect}>
          {" "}
          {address === 0 ? "Connect Wallet" : `${address.slice(0, 8)}....`}{" "}
        </button>
        <ClaimButton />
      </div>
    );
}

export default WalletButtons;