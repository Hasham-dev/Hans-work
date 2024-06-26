import React from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import toast, { Toaster } from 'react-hot-toast';

const Modal = styled.div`
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

const ModalContent = styled.div`
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 500px;
`;

const OfferList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
`;

const OfferItem = styled.li`
  background: #2c2c2c;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OfferButton = styled.button`
  background-color: #bb86fc;
  color: #121212;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d1a3ff;
  }
`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OffersModal = ({
  nftId,
  offers,
  onClose,
  setOffers,
  nftTradingContract,
  walletAddress,
}) => {
  const handleAcceptOffer = async (offer) => {
    if (!nftTradingContract || !walletAddress) return;

    try {
      console.log(offer);
      const transaction = await nftTradingContract.completeNftTrade(
        nftId,
        offer.tokenId,
        offer.owner,
        {
          value: ethers.utils.parseEther(offer.eth.toString()),
        }
      );
      await transaction.wait();

      // Remove the NFT from the database
      const response = await fetch(`${API_BASE_URL}/nft/${nftId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success(`Successfully traded your CR8R NFT card ${nftId}`);
        onClose();
      } else {
        console.error("Error deleting NFT from database:", response.statusText);
        toast.error("Error deleting NFT from database");
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
      toast.error("Failed to accept offer.");
    }
  };

  const handleRejectOffer = async (nftId, offerId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/nft/${nftId}/offer/${offerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.error(`Offer ${offerId} has been rejected.`);
        // Update the offers state to remove the rejected offer
        setOffers((prevOffers) =>
          prevOffers.filter((offer) => offer._id !== offerId)
        );
      } else {
        console.error("Error rejecting offer:", response.statusText);
        toast.error("Failed to reject offer.");
      }
    } catch (error) {
      console.error("Error rejecting offer:", error);
      toast.error("Failed to reject offer.");
    }
  };

  return (
    <Modal>
      <Toaster />
      <ModalContent>
        <h3>Offers for NFT ID #{nftId}</h3>
        <OfferList>
          {offers.map((offer, index) => (
            <OfferItem key={index}>
              <span>NFT ID: {offer.tokenId}</span>
              <span>Amount: {offer.eth} BNB</span>
              <div>
                <OfferButton onClick={() => handleAcceptOffer(offer)}>
                  Accept
                </OfferButton>
                <OfferButton
                  onClick={() => handleRejectOffer(nftId, offer._id)}
                >
                  Reject
                </OfferButton>
              </div>
            </OfferItem>
          ))}
        </OfferList>
        <OfferButton onClick={onClose}>Close</OfferButton>
      </ModalContent>
    </Modal>
  );
};

export default OffersModal;
