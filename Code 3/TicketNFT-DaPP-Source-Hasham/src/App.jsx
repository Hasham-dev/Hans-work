import React from "react";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import Header, { CustomFooter } from "./Components/header/header";
function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Header />
      <Banner />
      <CustomFooter />
      {/* <Footer /> */}
    </>
  );
}

export default App;
