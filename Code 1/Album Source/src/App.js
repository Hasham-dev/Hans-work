import "./App.css";
import FlipPage from "./components/flippage";
import Header from "./components/header/header";
import WalletButtons from "./components/wallet-buttons";
import Facebook from "./components/header/icons/facebook.png";
import Instagram from "./components/header/icons/instagram.png";
import Telegram from "./components/header/icons/telegram.png";
import Tiktok from "./components/header/icons/tiktok.png";
import Twitter from "./components/header/icons/twitter.png";
import Youtube from "./components/header/icons/youtube.png";
function App() {
  return (
    <div className="App">
      <Header />
      <FlipPage />
      <WalletButtons />
      <div className="footer">
        <div className="footer_container">
          <span>Copyright @ CR8R Token 2024</span>
          <div className="social_buttons_container">
            <a href="google.com">
              <img src={Facebook} height="40px" width="40px" />
            </a>
            <a href="google.com">
              <img src={Instagram} height="40px" width="40px" />
            </a>
            <a href="google.com">
              <img src={Telegram} height="40px" width="40px" />
            </a>
            <a href="google.com">
              <img src={Tiktok} height="40px" width="40px" />
            </a>
            <a href="google.com">
              <img src={Twitter} height="40px" width="40px" />
            </a>
            <a href="google.com">
              <img src={Youtube} height="40px" width="40px" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
