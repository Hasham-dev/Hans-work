import React, { useContext, useEffect, useState } from "react";
import WalletContext from "../context/WalletContext";
import NFTCard from "../components/NFTCard";
import styled from "styled-components";
import OffersModal from "../components/OffersModal";
import backgroundImage from '../assets/bg.png';
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

const Title = styled.h1`
  color: #fff; // Set the title color to black
`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyNFTsOnTrade = () => {
  const { nftTradingContract, walletAddress, nftContract } = useContext(WalletContext);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [offers, setOffers] = useState([]);
  const [showOffersModal, setShowOffersModal] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!walletAddress) {
        return;
      }
      setIsLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await fetch(
          `${API_BASE_URL}/nfts/owner/${walletAddress}`
        );
        if (!response.ok) {
          throw new Error("No NFTs found for this owner");
        }
        const data = await response.json();
        // Fetch token URIs for each NFT
        const nftsWithUri = await Promise.all(
          data.map(async (nft) => {
            const tokenUri = await getNFTTokenURI(nft.tokenId);
            return { ...nft, tokenUri };
          })
        );
        setNfts(nftsWithUri);
      } catch (error) {
        console.error("Error fetching NFTs for owner:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, [walletAddress]);

  const handleCancelTrade = async (tokenId) => {
    if (!nftTradingContract || !walletAddress) {
      return;
    }
    setIsLoading(true);
    setError(null); // Reset error before the operation
    try {
      // Cancel the trade on the blockchain
      const transaction = await nftTradingContract.cancelTrade(tokenId);
      await transaction.wait();

      // Call the API to remove the NFT from the database
      const response = await fetch(`${API_BASE_URL}/nft/${tokenId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedNfts = nfts.filter((nft) => nft.tokenId !== tokenId);
        setNfts(updatedNfts);
        toast.success(`Token ID ${tokenId} has been cancelled from trading successfully`);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error canceling NFT trade: ", error);
      toast.error("Failed to cancel NFT trade.");
      setError("Failed to cancel NFT trade.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewOffers = async (tokenId) => {
    if (!tokenId) {
      return;
    }
    setIsLoading(true);
    setError(null); // Reset error before the operation
    try {
      const response = await fetch(
        `${API_BASE_URL}/nft/${tokenId}/offers`
      );
      if (!response.ok) {
        throw new Error("Error fetching offers");
      }
      const data = await response.json();
      setOffers(data);
      setSelectedNFT(tokenId);
      setShowOffersModal(true);
    } catch (error) {
      console.error("Error fetching offers:", error);
      setError("Failed to fetch offers.");
      toast.error("Failed to fetch offers.");
    } finally {
      setIsLoading(false);
    }
  };

  const getNFTTokenURI = async (tokenId) => {
    try {
      const tokenUri = await nftContract.tokenURI(tokenId);  // Added await here
      return tokenUri;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Overlay />
      <Content>
        <Toaster />
        <Title>My NFT cards on Trade</Title>
        {isLoading && (
          <LoaderModal>
            <Loader />
          </LoaderModal>
        )}

        {!isLoading && (
          <>
            {error ? (
              <div>{error}</div>
            ) : nfts.length === 0 ? (
              <div>No NFTs on trade</div>
            ) : (
              nfts.map((nft, index) => (
                <NFTCard
                  key={index}
                  nft={{
                    tokenId: nft.tokenId,
                    image: nft.tokenUri || import.meta.env.VITE_DEFAULT_IMAGE_URL,
                    price: nft.price,
                  }}
                  actionType="my-nfts-on-trade"
                  onCancelTrade={handleCancelTrade}
                  onViewOffers={handleViewOffers}
                />
              ))
            )}
            {showOffersModal && (
              <OffersModal
                nftId={selectedNFT}
                offers={offers}
                onClose={() => setShowOffersModal(false)}
                setOffers={setOffers}
                nftTradingContract={nftTradingContract}
                walletAddress={walletAddress}
              />
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default MyNFTsOnTrade;