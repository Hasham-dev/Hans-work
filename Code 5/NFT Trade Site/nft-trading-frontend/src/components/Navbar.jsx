import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WalletContext from "../context/WalletContext";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  background-color: #000000;
  border-bottom: 2px solid #fff;

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    padding: 1rem 0rem;
  }
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;

  @media only screen and (max-width: 600px) {
    padding: 0;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLinkItem = styled.li`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.3s;
  color: #fff;
  white-space: nowrap;

  &:hover {
    background-color: #00000090;
    transform: scale(1.05);
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media only screen and (max-width: 600px) {
    justify-content: center;
    width: 100%;
    margin-top: 10px;
  }
`;

const Address = styled.span`
  color: #000000;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
`;

const DisconnectButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #000000;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #ffffff90;
    color: #121212;
    transform: scale(1.05);
  }
`;

const Navbar = () => {
  const { walletAddress, disconnectWallet } = useContext(WalletContext);

  const shortenAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
  };

  return (
    <Nav>
      <NavLinks>
        <NavLinkItem>
          <StyledLink to="/nfts-on-trade">NFTs on Trade</StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/my-nfts">My NFTs</StyledLink>
        </NavLinkItem>
        <NavLinkItem>
          <StyledLink to="/my-nfts-on-trade">My NFTs on Trade</StyledLink>
        </NavLinkItem>
      </NavLinks>
      {walletAddress && (
        <WalletInfo>
          <Address>{shortenAddress(walletAddress)}</Address>
          <DisconnectButton onClick={disconnectWallet}>
            Disconnect Wallet
          </DisconnectButton>
        </WalletInfo>
      )}
    </Nav>
  );
};

export default Navbar;
