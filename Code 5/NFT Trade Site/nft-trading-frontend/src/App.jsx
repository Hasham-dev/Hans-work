import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WalletContext from "./context/WalletContext";
import GlobalStyle from "./GlobalStyle";
import ConnectWallet from "./components/ConnectWallet";
import Navbar from "./components/Navbar";
import NFTsOnTrade from "./pages/NFTsOnTrade";
import MyNFTs from "./pages/MyNFTs";
import MyNFTsOnTrade from "./pages/MyNFTsOnTrade";
import Header, { CustomFooter } from "./components/header/header";

const App = () => {
  const { walletAddress } = useContext(WalletContext);

  return (
    <div>
      <GlobalStyle />
      <Header />
      {walletAddress ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/nfts-on-trade" element={<NFTsOnTrade />} />
            <Route path="/my-nfts" element={<MyNFTs />} />
            <Route path="/my-nfts-on-trade" element={<MyNFTsOnTrade />} />
            <Route path="*" element={<Navigate to="/nfts-on-trade" />} />
          </Routes>
        </>
      ) : (
        <ConnectWallet />
      )}
      <CustomFooter />
    </div>
  );
};

export default App;
