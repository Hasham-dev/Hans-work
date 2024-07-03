import React, { useContext, useEffect, useState } from "react";
import WalletContext from "../context/WalletContext";
import styled from "styled-components";
import NFTCard from "../components/NFTCard";
import { ethers } from "ethers";
import backgroundImage from '../assets/bg.png'; // import your image
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
  position: relative;
  padding: 2rem;
  min-height: 100vh; // Ensure it covers the full viewport
  width: 100vw; // Full viewport width
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); // Black overlay with 60% opacity
  z-index: 1; // Ensure the overlay is above the background image
`;

const Content = styled.div`
  position: relative;
  z-index: 2; // Ensure content is above the overlay
`;

const Title = styled.h1`
  color: #fff; // Set the title color to white
`;

const LoaderModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #bb86fc;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NFTsOnTrade = () => {
  const { nftTradingContract, walletAddress, nftContract } = useContext(WalletContext);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/nft`);
        const data = await response.json();
        // Filter out the NFTs owned by the current user
        const filteredNFTs = data.filter(
          (nft) => nft.owner.toLowerCase() !== walletAddress.toLowerCase()
        );

        // Fetch token URIs for each NFT
        const nftsWithUri = await Promise.all(
          filteredNFTs.map(async (nft) => {
            const tokenUri = await getNFTTokenURI(nft.tokenId);
            return { ...nft, tokenUri };
          })
        );

        setNfts(nftsWithUri);
        console.log("NFTs on Trade", nftsWithUri);
      } catch (error) {
        console.error("Error fetching NFTs on trade:", error);
      }
      setIsLoading(false);
    };

    if (walletAddress) {
      fetchNFTs();
    }
  }, [walletAddress]);

  const getNFTTokenURI = async (tokenId) => {
    try {
      console.log(tokenId);
      const tokenUri = await nftContract.tokenURI(tokenId);
      return tokenUri;
      console.log(tokenUri);
    } catch (error) {
      console.error("Error fetching token URI:", error);
    }
  };

  const handleBuy = async (tokenId, price) => {
    if (!nftTradingContract || !walletAddress) return;

    setIsLoading(true);
    try {
      // Convert price to string if it's not already
      const priceInEther = typeof price === "string" ? price : price.toString();

      // Call the completeTrade function from the smart contract
      const transaction = await nftTradingContract.completeTrade(
        tokenId,
        walletAddress,
        {
          value: ethers.utils.parseEther(priceInEther),
        }
      );
      await transaction.wait();

      // Delete the NFT from the database
      const response = await fetch(`${API_BASE_URL}/nft/${tokenId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the NFT from the local state
        const updatedNfts = nfts.filter((nft) => nft.tokenId !== tokenId);
        setNfts(updatedNfts);
        toast.success(`Successfully bought NFT ${tokenId}`);
      } else {
        console.error("Error deleting NFT from database:", response.statusText);
      }
    } catch (error) {
      console.error("Error buying NFT:", error);
      toast.error("Failed to buy NFT.");
    }
    setIsLoading(false);
  };

  const handleSendOffer = async (tokenId, offerId, additionalFunds) => {
    if (!walletAddress || !nftTradingContract) return;

    setIsLoading(true);
    try {
      // Check if the user owns the token they are offering
      const owner = await nftContract.ownerOf(offerId);
      if (owner.toLowerCase() !== walletAddress.toLowerCase()) {
        toast.error("You do not own the token you are offering.");
        setIsLoading(false);
        return;
      }

      // Approve the NFT to the trading contract
      const approvalTransaction = await nftContract.approve(
        nftTradingContract.address,
        offerId
      );
      await approvalTransaction.wait();

      // Send the offer
      const response = await fetch(`${API_BASE_URL}/nft/${tokenId}/offer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offer_nft_id: offerId,
          eth: ethers.utils.formatEther(additionalFunds),
          owner: walletAddress,
        }),
      });

      if (response.ok) {
        const updatedNFT = await response.json();
        toast.success(`Successfully Approved NFT Token ID ${tokenId} for Trading`);
      } else {
        console.error("Error sending offer:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending offer:", error);
      toast.error("Failed to send offer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Overlay />
      <Content>
        <Toaster />
        {isLoading && (
          <LoaderModal>
            <Loader />
          </LoaderModal>
        )}
        {!isLoading && (
          <>
            <Title>NFT Cards on Trade</Title>
            {nfts.length === 0 ? (
              <div>There is no NFT on trade</div>
            ) : (
              nfts.map((nft, index) => (
                <NFTCard
                  key={index}
                  nft={{
                    tokenId: nft.tokenId,
                    image: nft.tokenUri ? nft.tokenUri : import.meta.env.VITE_DEFAULT_IMAGE_URL,
                    price: nft.price,
                  }}
                  actionType="trade"
                  onBuy={() => handleBuy(nft.token_id, nft.price)}
                  onSendOffer={handleSendOffer}
                />
              ))
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default NFTsOnTrade;