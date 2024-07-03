import React, { useContext, useEffect, useState } from "react";
import WalletContext from "../context/WalletContext";
import NFTCard from "../components/NFTCard";
import styled from "styled-components";
import { ethers } from "ethers";
import backgroundImage from '../assets/bg.png';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
  position: relative;
  padding: 2rem;
  min-height: 100vh;
  width: 100vw;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 0.5rem;
    min-height: 54vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
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
  color: #fff;
`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyNFTs = () => {
  const { nftContract, nftTradingContract, walletAddress } = useContext(WalletContext);

  const [nfts, setNfts] = useState([]);
  const [nftsOnTrade, setNftsOnTrade] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (walletAddress) {
        setIsLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/moralis/nfts/${walletAddress}`);
          const data = await response.json();
          setNfts(data.result);
          console.log(nfts);
          console.log(data.result);
        } catch (error) {
          console.error("Error fetching NFTs from Moralis:", error);
        }
        setIsLoading(false);
      }
    };

    const fetchNFTsOnTrade = async () => {
      if (walletAddress) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/nfts/owner/${walletAddress}`
          );
          const data = await response.json();
          if (response.ok) {
            setNftsOnTrade(data);
          } else {
            console.error("Error fetching NFTs on trade:", data.error);
          }
        } catch (error) {
          console.error("Error fetching NFTs on trade:", error);
        }
      }
    };

    fetchNFTs();
    fetchNFTsOnTrade();
  }, [walletAddress]);

  const handlePutOnTrade = async (tokenId, priceInWei) => {
    if (nftTradingContract && walletAddress) {
      try {
        const approvalTransaction = await nftContract.approve(
          nftTradingContract.address,
          tokenId
        );
        await approvalTransaction.wait();

        const transaction = await nftTradingContract.createTrade(
          tokenId,
          priceInWei
        );
        await transaction.wait();

        const response = await fetch(`${API_BASE_URL}/nft`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenId,
            owner: walletAddress,
            on_trade: true,
            price: ethers.utils.formatEther(priceInWei),
          }),
        });

        if (response.ok) {
          const savedNFT = await response.json();
          console.log("NFT saved:", savedNFT);
          setNftsOnTrade([...nftsOnTrade, savedNFT]);
        } else {
          console.error("Error saving NFT:", response.statusText);
        }

        toast.success(
          `NFT ${tokenId} is now on trade for ${ethers.utils.formatEther(
            priceInWei
          )} BNBs`
        );
      } catch (error) {
        console.error("Error putting NFT on trade: ", error);
        toast.error("Failed to put NFT on trade.");
      }
    }
  };

  return (
    <Container>
      <Overlay />
      <Content>
        <Toaster />
        <Title>My CR8R NFT Cards</Title>
        {isLoading && (
          <LoaderModal>
            <Loader />
          </LoaderModal>
        )}
        {nfts.length === 0 ? (
          <div>You don't have any NFT</div>
        ) : (
          nfts
            .filter(nft => !nftsOnTrade.some(tradeNft => tradeNft.tokenId === nft.token_id))
            .map((nft, index) => (
              <NFTCard
                key={index}
                nft={{
                  tokenId: nft.token_id,
                  image: nft.token_uri ? nft.token_uri.replace('https://ipfs.moralis.io:2053/ipfs/', 'https://ipfs.io/ipfs/') : import.meta.env.VITE_DEFAULT_IMAGE_URL,
                  price: nft.price,
                }}
                actionType="my-nfts"
                onPutOnTrade={handlePutOnTrade}
                isDisabled={nftsOnTrade.some(
                  (tradeNft) => tradeNft.tokenId === nft.token_id
                )}
              />
            ))
        )}
      </Content>
    </Container>
  );
};

export default MyNFTs;