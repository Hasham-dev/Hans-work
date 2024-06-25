import React, { useState } from "react";
import "./hero.css";
import { ethers } from "ethers";

export default function Hero() {
  const [address, setaddress] = useState(0);
  const connect = async () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // open the deeplink page
      window.open("https://metamask.app.link/dapp/mint.niftigram.io/");
    } else {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const add = await signer.getAddress();
      setaddress(add);
    }
  };
  return (
    <div className="button_hero_container">
      {/* <button className="neon-button">View Nifti's Album</button> */}
      <button onClick={connect} className="neon-button">
        {address === 0 ? "Connect Wallet" : `${address.slice(0, 8)}....`}
      </button>
    </div>
  );
}
