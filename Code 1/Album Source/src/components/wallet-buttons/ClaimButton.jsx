import React from 'react'
import { ethers } from "ethers";
import { useState } from 'react';


const ClaimButton = () => {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");

    const contractABI = [
      "function symbol() view returns (string)",
      "function ownerOf(uint256 tokenId) view returns (address)",
    ];

    const bscNetwork = {
      chainId: "0x38", // 56 in decimal
      chainName: "Binance Smart Chain",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com"],
    };

    // Function to connect wallet
    const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        try {
          // Request accounts and set up session
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();

          // Check if we are on the BSC network
          const { chainId } = await provider.getNetwork();
          if (chainId !== 56) {
            try {
              // Try to switch to the BSC network
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: bscNetwork.chainId }],
              });
            } catch (switchError) {
              // This error code indicates that the chain has not been added to MetaMask.
              if (switchError.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [bscNetwork],
                  });
                } catch (addError) {
                  console.error("Error adding BSC network:", addError);
                }
              } else {
                console.error("Error switching to BSC network:", switchError);
              }
            }
          }

          // Fetch balance after confirming network
          const balance = await provider.getBalance(address);
          const balanceInEth = ethers.utils.formatEther(balance);
          setAccount(address);
          setBalance(balanceInEth);
          console.log("Connected account:", address, "Balance:", balanceInEth);
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        alert(
          "Please install MetaMask or enable it in your browser to connect."
        );
      }
    };

    const checkTokenOwnership = async () => {
      if (!account) {
        alert("Please connect your wallet first.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS; // Replace with your contract address
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      let ownedTokens = [];

      for (let tokenId = 1; tokenId <= 100; tokenId++) {
        try {
          const tokenOwner = await contract.ownerOf(tokenId);
          if (tokenOwner.toLowerCase() === account.toLowerCase()) {
            ownedTokens.push(tokenId);
          }
        } catch (error) {
          console.log(
            `Token ID ${tokenId} is not found or error fetching:`,
            error
          );
        }
      }

      console.log(`Tokens owned by the connected wallet:`, ownedTokens);
      alert(`You own ${ownedTokens.length} tokens from ID 1 to 100.`);

      if (ownedTokens.length === 100) {
        alert("Congratulations! You own all 100 tokens.");
        sendEmail();
      }
    };

    const sendEmail = async () => {
      const emailInfo = {
        to: process.env.REACT_APP_TO_EMAIL, // This should be set to the recipient's email address
        subject: process.env.REACT_APP_EMAIL_SUBJECT,
        text: `Congratulations! The address ${account} now own all 100 NFTs.`,
      };

      try {
        const response = await fetch(process.env.REACT_APP_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailInfo),
        });

        const data = await response.json();
        if (response.status === 200) {
          console.log("Email sent successfully:", data);
          alert("Email sent successfully!");
        } else {
          console.error("Failed to send email:", data);
          alert("Failed to send email.");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Error sending email.");
      }
    };

    // Helper function to format the wallet address
    const formatAddress = (address) => {
      return `${address.substring(0, 6)}...${address.substring(
        address.length - 4
      )}`;
    };
return (
  <button onClick={checkTokenOwnership} className="neon_button">
    Claim Button
  </button>
);
}

export default ClaimButton