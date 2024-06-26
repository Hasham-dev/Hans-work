const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const NFT = require("./models/NFT"); // Import the NFT model
const cors = require("cors");
const Moralis = require("moralis").default;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: '*', // Update this to your front-end URL to restrict access
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// MongoDB URI
const uri = process.env.DB_CONNECTION_URL;

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => {
    console.log("Mongoose connected to MongoDB!");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Moralis initialization
Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
}).then(() => {
  console.log("Moralis initialized!");
}).catch(err => {
  console.error("Error initializing Moralis:", err);
});

// POST API to save trading NFT data
app.post("/nft", async (req, res) => {
  const { tokenId, owner, on_trade, price } = req.body;

  const newNFT = new NFT({
    tokenId,
    owner,
    on_trade,
    price,
  });

  try {
    const savedNFT = await newNFT.save();
    res.status(201).json(savedNFT);
  } catch (error) {
    console.error("Error saving NFT:", error);
    res.status(400).json({ error: "Error saving NFT" });
  }
});

// POST API to save offers against specific NFT
app.post("/nft/:tokenId/offer", async (req, res) => {
  const { tokenId } = req.params;
  const { offer_nft_id, eth, owner } = req.body;

  try {
    const nft = await NFT.findOne({ tokenId });

    if (!nft) {
      return res.status(404).json({ error: "NFT not found" });
    }

    const newOffer = {
      tokenId: offer_nft_id,
      eth,
      owner,
    };

    nft.offers.push(newOffer);
    const updatedNFT = await nft.save();

    res.status(201).json(updatedNFT);
  } catch (error) {
    console.error("Error adding offer to NFT:", error);
    res.status(400).json({ error: "Error adding offer to NFT" });
  }
});

// GET API to fetch all trading NFT data
app.get("/nft", async (req, res) => {
  try {
    const nfts = await NFT.find().select("-offers");
    res.status(200).json(nfts);
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).json({ error: "Error fetching NFTs" });
  }
});

// GET API to fetch offers against specific NFT
app.get("/nft/:tokenId/offers", async (req, res) => {
  const { tokenId } = req.params;

  try {
    const nft = await NFT.findOne({ tokenId });

    if (!nft) {
      return res.status(404).json({ error: "NFT not found" });
    }

    res.status(200).json(nft.offers);
  } catch (error) {
    console.error("Error fetching offers for NFT:", error);
    res.status(500).json({ error: "Error fetching offers for NFT" });
  }
});

// GET API to fetch NFT data for a specific owner
app.get("/nfts/owner/:owner", async (req, res) => {
  const { owner } = req.params;

  try {
    const nfts = await NFT.find({ owner }).select("-offers");
    if (nfts.length === 0) {
      return res.status(404).json({ error: "No NFTs found for this owner" });
    }

    res.status(200).json(nfts);
  } catch (error) {
    console.error("Error fetching NFTs for owner:", error);
    res.status(500).json({ error: "Error fetching NFTs for owner" });
  }
});

// DELETE API to delete a specific offer from an NFT
app.delete("/nft/:tokenId/offer/:offer_id", async (req, res) => {
  const { tokenId, offer_id } = req.params;

  try {
    const nft = await NFT.findOne({ tokenId });

    if (!nft) {
      return res.status(404).json({ error: "NFT not found" });
    }

    const offerIndex = nft.offers.findIndex(
      (offer) => offer._id.toString() === offer_id
    );

    if (offerIndex === -1) {
      return res.status(404).json({ error: "Offer not found" });
    }

    nft.offers.splice(offerIndex, 1);
    const updatedNFT = await nft.save();

    res.status(200).json(updatedNFT);
  } catch (error) {
    console.error("Error deleting offer from NFT:", error);
    res.status(500).json({ error: "Error deleting offer from NFT" });
  }
});

// DELETE API to delete a specific NFT and all its offers
app.delete("/nft/:tokenId", async (req, res) => {
  const { tokenId } = req.params;

  try {
    const nft = await NFT.findOneAndDelete({ tokenId });

    if (!nft) {
      return res.status(404).json({ error: "NFT not found" });
    }

    res
      .status(200)
      .json({ message: "NFT and its offers deleted successfully" });
  } catch (error) {
    console.error("Error deleting NFT:", error);
    res.status(500).json({ error: "Error deleting NFT" });
  }
});

// New GET API to fetch all NFTs using Moralis
app.get("/moralis/nfts/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
  const nftAddress = process.env.NFT_CONTRACT_ADDRESS;

  try {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x38",
      "format": "decimal",
      "tokenAddresses": [nftAddress],
      "mediaItems": false,
      "address": walletAddress
    });

    res.status(200).json(response.raw);
  } catch (error) {
    console.error("Error fetching NFTs from Moralis:", error);
    res.status(500).json({ error: "Error fetching NFTs from Moralis" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
