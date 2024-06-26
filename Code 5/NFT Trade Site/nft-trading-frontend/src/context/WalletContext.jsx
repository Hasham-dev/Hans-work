import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { getNftTradingContract, getNftContract } from "../utils/contracts";
import toast, { Toaster } from 'react-hot-toast';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [nftTradingContract, setNftTradingContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const network = await provider.getNetwork();
        if (network.chainId !== 56) {
          await switchToBinance();
        }

        const signer = provider.getSigner();
        setWalletAddress(accounts[0]);
        setNftTradingContract(getNftTradingContract(signer));
        setNftContract(getNftContract(signer));
        toast.success('Successfully connected');
      } catch (error) {
        toast.error('Error connecting to wallet!');
      }
    } else {
      toast.error("MetaMask is not installed");
    }
  };

  const switchToBinance = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }], // Sepolia chain ID
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x38",
                chainName: "BNB Smart Chain",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                rpcUrls: ["https://binance.llamarpc.com	"],
                blockExplorerUrls: ["https://www.bscscan.io"],
              },
            ],
          });
          toast.success('Switched to Binance network!');
        } catch (addError) {
          console.error("Error adding Binance network: ", addError);
          toast.error('Error adding Binance network!');

        }
      } else {
        console.error("Error switching to Binance network: ", switchError);
        toast.error('Error switching to Binance network!');
      }
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setProvider(null);
    setNftTradingContract(null);
    setNftContract(null);
    toast.success('Wallet Disconnected');
  };

  return (
    <>
      <Toaster />
      <WalletContext.Provider
        value={{
          walletAddress,
          connectWallet,
          disconnectWallet,
          provider,
          nftTradingContract,
          nftContract,
        }}
      >
        {children}
      </WalletContext.Provider>
    </>
  );
};

export default WalletContext;
