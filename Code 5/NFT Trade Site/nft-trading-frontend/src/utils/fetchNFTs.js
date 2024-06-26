import { ethers } from "ethers";

const DEFAULT_IMAGE_URL = import.meta.env.VITE_DEFAULT_IMAGE_URL; // Replace with your default image URL

export const fetchMyNFTs = async (nftContract, walletAddress) => {
  const nfts = [];

  // Define the filter for Transfer events to the wallet address
  const filter = nftContract.filters.Transfer(null, walletAddress);

  // Query the event logs
  const events = await nftContract.queryFilter(filter);

  for (const event of events) {
    const tokenId = event.args.tokenId.toString();
    const tokenURI = await nftContract.tokenURI(tokenId);

    let image = tokenURI;
    if (tokenURI.startsWith("ipfs://")) {
      image = `https://ipfs.io/ipfs/${tokenURI.split("ipfs://")[1]}`;
    } else if (tokenURI.startsWith("http")) {
      try {
        const response = await fetch(tokenURI);
        const metadata = await response.json();
        image = metadata.image || DEFAULT_IMAGE_URL;
      } catch (error) {
        console.error(`Error fetching metadata for token ${tokenId}:`, error);
        image = DEFAULT_IMAGE_URL;
      }
    } else {
      image = DEFAULT_IMAGE_URL;
    }

    nfts.push({ tokenId, image });
  }

  return nfts;
};


