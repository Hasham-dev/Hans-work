import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/')); // BNB Mainnet

export default web3;
