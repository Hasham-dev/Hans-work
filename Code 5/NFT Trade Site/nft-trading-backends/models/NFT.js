// models/NFT.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for offers
const offerSchema = new Schema({
  tokenId: { type: String, required: true },
  eth: { type: Number, required: true },
  owner: { type: String, required: true }
});

// Main schema for NFT
const nftSchema = new Schema({
  tokenId: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  on_trade: { type: Boolean, default: false },
  price: { type: Number, required: true },
  offers: [offerSchema]
}, { collection: 'nftDetails' }); // Specify the collection name

// Create a model from the schema
const NFT = mongoose.model('NFT', nftSchema);

module.exports = NFT;
