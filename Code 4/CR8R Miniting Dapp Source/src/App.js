import "./App.css";
import Header from "./components/header/header";
import Hero from "./components/hero/Hero";
import Mint from "./components/mint/mint";
import Video from "./components/video/video";

function App() {
  return (
    <div className="App">
      {/* <Video /> */}
      <Header />
      <Hero />
      <Mint />
    </div>
  );
}

export default App;
