import React, { useContext } from "react";
import styled from "styled-components";
import WalletContext from "../context/WalletContext";
import backgroundImage from '../assets/bg.png';
import toast, { Toaster } from 'react-hot-toast';

const ConnectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); // Black overlay with 70% opacity
    z-index: 0;
  }

  > * {
    z-index: 1; // Ensure content is above the overlay
  }
`;

const ConnectButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #000000;
  font-family: "Cabin Sketch", cursive;

  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00000090;
  }
`;

const ConnectWallet = () => {
  const { connectWallet } = useContext(WalletContext);

  return (
    <ConnectWrapper>
      <h1>Connect Your Wallet</h1>
      <ConnectButton onClick={connectWallet}>Connect MetaMask</ConnectButton>
    </ConnectWrapper>
  );
};

export default ConnectWallet;