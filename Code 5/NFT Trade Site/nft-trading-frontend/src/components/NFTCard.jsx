import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import toast, { Toaster } from 'react-hot-toast';
import { ethers } from "ethers";

const Card = styled.div`
  background-color: #1e1e1e;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  display: inline-block;
  text-align: center;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardMedia = styled.div`
  width: 100%;
  border-bottom: 1px solid #fff;
  padding-bottom: 1rem;

  img, video {
    max-width: 100%;
    border-radius: 8px;
  }

  video {
    width: 100%;
    border-bottom: 1px solid #fff;
    padding-bottom: 1rem;
  }
`;

const CardButton = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d1a3ff;
  }
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

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
`;

const Input = styled.input`
  background: #2c2c2c;
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 1rem 0;
  color: #fff;
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #fff;
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

const NFTCard = ({
  nft,
  actionType,
  onBuy,
  onSendOffer,
  onPutOnTrade,
  onCancelTrade,
  onViewOffers,
  isDisabled,
}) => {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [offer, setOffer] = useState({ id: "", funds: "" });
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nftMetadata, setNftMetadata] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (nft.image) {
        try {
          const ipfsGateways = [
            'https://gateway.pinata.cloud/ipfs/',
            'https://ipfs.io/ipfs/',
            'https://cloudflare-ipfs.com/ipfs/'
          ];
          let metadata = null;

          for (const gateway of ipfsGateways) {
            try {
              const response = await fetch(nft.image.replace('ipfs://', gateway));
              if (response.ok) {
                metadata = await response.json();
                break;
              }
            } catch (error) {
              console.error(`Error fetching from gateway ${gateway}:`, error);
            }
          }

          if (metadata) {
            setNftMetadata(metadata);
            console.log(metadata.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/'));
          } else {
            console.error("Error fetching NFT metadata from all gateways");
          }
        } catch (error) {
          console.error("Error fetching NFT metadata:", error);
        }
      }
    };

    fetchMetadata();
  }, [nft.image]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, [nftMetadata]);

  const isVideo = (url) => {
    return url && url.endsWith('.mp4');
  };

  const handleSendOffer = () => {
    onSendOffer(nft.tokenId, offer.id, ethers.utils.parseEther(offer.funds));
    setShowOfferModal(false);
  };

  const handlePutOnTrade = async () => {
    if (isNaN(price) || parseFloat(price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    const priceInWei = ethers.utils.parseEther(price);
    setIsLoading(true);
    await onPutOnTrade(nft.tokenId, priceInWei);
    setIsLoading(false);
    setShowTradeModal(false);
  };

  const getVideoSource = () => {
    const ipfsGateways = [
      'https://gateway.pinata.cloud/ipfs/',
      'https://ipfs.io/ipfs/',
      'https://cloudflare-ipfs.com/ipfs/'
    ];
    for (const gateway of ipfsGateways) {
      return nftMetadata.image.replace('ipfs://', gateway);
    }
  };

  return (
    <Card>
      <CardMedia>
        {nftMetadata ? (
          <>
            <video
              controls
              autoPlay
              loop
            >
              <source
                src={`https://memes1album.cr8rtoken.io/static/media/${nft.tokenId}.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </>
        ) : (
          <img src={import.meta.env.VITE_DEFAULT_IMAGE_URL} alt={`NFT ${nft.tokenId}`} />
        )}
      </CardMedia>
      <p>Token ID: {nft.tokenId}</p>
      {nft.price && <p>Price: {nft.price} BNB</p>}
      {actionType === "trade" && (
        <>
          <CardButton onClick={onBuy}>Buy</CardButton>
          <CardButton onClick={() => setShowOfferModal(true)}>Trade</CardButton>
        </>
      )}
      {actionType === "my-nfts" && (
        <CardButton onClick={() => setShowTradeModal(true)} disabled={isDisabled}>
          Put on Trade
        </CardButton>
      )}
      {actionType === "my-nfts-on-trade" && (
        <>
          <CardButton onClick={() => onCancelTrade(nft.tokenId)}>Cancel NFT Trade</CardButton>
          <CardButton onClick={() => onViewOffers(nft.tokenId)}>View Offers</CardButton>
        </>
      )}

      {showOfferModal && (
        <Modal>
          <ModalContent>
            <h3>Send Offer</h3>
            <label>NFT ID:</label>
            <Input type="text" value={offer.id} onChange={(e) => setOffer({ ...offer, id: e.target.value })} />
            <label>Additional Funds (BNB):</label>
            <Input type="text" value={offer.funds} onChange={(e) => setOffer({ ...offer, funds: e.target.value })} />

            <CardButton onClick={handleSendOffer}>Send Offer</CardButton>
            <CardButton onClick={() => setShowOfferModal(false)}>Close</CardButton>
          </ModalContent>
        </Modal>
      )}

      {showTradeModal && (
        <Modal>
          <ModalContent>
            <h3>Put on Trade</h3>
            <label>Price (BNB):</label>
            <Input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <CardButton onClick={handlePutOnTrade}>Put on Trade</CardButton>
                <CardButton onClick={() => setShowTradeModal(false)}>Close</CardButton>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default NFTCard;
