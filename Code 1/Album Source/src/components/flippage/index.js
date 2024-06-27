import React from "react";
import HTMLFlipBook from "react-pageflip";
import { ethers, BigNumber } from "ethers";

import "./index.css";
import { useState, useEffect } from "react";
import contractABI from "./abi.json";

export default function FlipPage() {
  const [images, setImages] = useState({
    list: [
      "./holders/1.png",
      "./holders/2.png",
      "./holders/3.png",
      "./holders/4.png",
      "./holders/5.png",
      "./holders/6.png",
      "./holders/7.png",
      "./holders/8.png",
      "./holders/9.png",
      "./holders/10.png",
      "./holders/11.png",
      "./holders/12.png",
      "./holders/13.png",
      "./holders/14.png",
      "./holders/15.png",
      "./holders/16.png",
      "./holders/17.png",
      "./holders/18.png",
      "./holders/19.png",
      "./holders/20.png",
      "./holders/21.png",
      "./holders/22.png",
      "./holders/23.png",
      "./holders/24.png",
      "./holders/25.png",
      "./holders/26.png",
      "./holders/27.png",
      "./holders/28.png",
      "./holders/29.png",
      "./holders/30.png",
      "./holders/31.png",
      "./holders/32.png",
      "./holders/33.png",
      "./holders/34.png",
      "./holders/35.png",
      "./holders/36.png",
      "./holders/37.png",
      "./holders/38.png",
      "./holders/39.png",
      "./holders/40.png",
      "./holders/41.png",
      "./holders/42.png",
      "./holders/43.png",
      "./holders/44.png",
      "./holders/45.png",
      "./holders/46.png",
      "./holders/47.png",
      "./holders/48.png",
      "./holders/49.png",
      "./holders/50.png",
      "./holders/51.png",
      "./holders/52.png",
      "./holders/53.png",
      "./holders/54.png",
      "./holders/55.png",
      "./holders/56.png",
      "./holders/57.png",
      "./holders/58.png",
      "./holders/59.png",
      "./holders/60.png",
      "./holders/61.png",
      "./holders/62.png",
      "./holders/63.png",
      "./holders/64.png",
      "./holders/65.png",
      "./holders/66.png",
      "./holders/67.png",
      "./holders/68.png",
      "./holders/69.png",
      "./holders/70.png",
      "./holders/71.png",
      "./holders/72.png",
      "./holders/73.png",
      "./holders/74.png",
      "./holders/75.png",
      "./holders/76.png",
      "./holders/77.png",
      "./holders/78.png",
      "./holders/79.png",
      "./holders/80.png",
      "./holders/81.png",
      "./holders/82.png",
      "./holders/83.png",
      "./holders/84.png",
      "./holders/85.png",
      "./holders/86.png",
      "./holders/87.png",
      "./holders/88.png",
      "./holders/89.png",
      "./holders/90.png",
      "./holders/91.png",
      "./holders/92.png",
      "./holders/93.png",
      "./holders/94.png",
      "./holders/95.png",
      "./holders/96.png",
      "./holders/97.png",
      "./holders/98.png",
      "./holders/99.png",
      "./holders/100.png",
    ],
  });

  const startURL = "https://gateway.pinata.cloud/ipfs/";
  const NiftiContract = "0x7cd7949910B76106B0dE4EEe1f0fA3F98CFD3CA1";

  const setIndex = (num) => {
    switch (num) {
      case 1:
        return 53;
      case 2:
        return 34;
      case 3:
        return 73;
      case 4:
        return 65;
      case 5:
        return 45;
      case 6:
        return 56;
      case 7:
        return 21;
      case 8:
        return 77;
      case 9:
        return 10;
      case 10:
        return 24;
      case 11:
        return 25;
      case 12:
        return 95;
      case 13:
        return 43;
      case 14:
        return 41;
      case 15:
        return 2;
      case 16:
        return 42;
      case 17:
        return 83;
      case 18:
        return 81;
      case 19:
        return 84;
      case 20:
        return 19;
      case 21:
        return 47;
      case 22:
        return 99;
      case 23:
        return 59;
      case 24:
        return 37;
      case 25:
        return 13;
      case 26:
        return 49;
      case 27:
        return 51;
      case 28:
        return 89;
      case 29:
        return 27;
      case 30:
        return 91;
      case 31:
        return 88;
      case 32:
        return 75;
      case 33:
        return 7;
      case 34:
        return 61;
      case 35:
        return 35;
      case 36:
        return 70;
      case 37:
        return 67;
      case 38:
        return 63;
      case 39:
        return 9;
      case 40:
        return 92;
      case 41:
        return 93;
      case 42:
        return 50;
      case 43:
        return 52;
      case 44:
        return 39;
      case 45:
        return 60;
      case 46:
        return 79;
      case 47:
        return 100;
      case 48:
        return 5;
      case 49:
        return 4;
      case 50:
        return 33;
      case 51:
        return 54;
      case 52:
        return 15;
      case 53:
        return 12;
      case 54:
        return 46;
      case 55:
        return 55;
      case 56:
        return 17;
      case 57:
        return 23;
      case 58:
        return 26;
      case 59:
        return 97;
      case 60:
        return 85;
      case 61:
        return 57;
      case 62:
        return 30;
      case 63:
        return 72;
      case 64:
        return 64;
      case 65:
        return 86;
      case 66:
        return 58;
      case 67:
        return 29;
      case 68:
        return 31;
      case 69:
        return 68;
      case 70:
        return 69;
      case 71:
        return 71;
      case 72:
        return 62;
      case 73:
        return 8;
      case 74:
        return 36;
      case 75:
        return 32;
      case 76:
        return 87;
      case 77:
        return 76;
      case 78:
        return 94;
      case 79:
        return 90;
      case 80:
        return 28;
      case 81:
        return 40;
      case 82:
        return 14;
      case 83:
        return 38;
      case 84:
        return 48;
      case 85:
        return 20;
      case 86:
        return 80;
      case 87:
        return 82;
      case 88:
        return 6;
      case 89:
        return 3;
      case 90:
        return 1;
      case 91:
        return 44;
      case 92:
        return 96;
      case 93:
        return 98;
      case 94:
        return 18;
      case 95:
        return 78;
      case 96:
        return 22;
      case 97:
        return 11;
      case 98:
        return 16;
      case 99:
        return 66;
      case 100:
        return 74;

      default:
        break;
    }
  };

  const getWalletImage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NiftiContract, contractABI, signer);
      const address = await signer.getAddress().then(function (response) {
        return response;
      });

      try {
        const walletIds = await contract.Owned(address);

        const tokenURI = await Promise.all(
          walletIds.map(async (token) => {
            const dtokenURI = await contract.tokenURI(
              BigNumber.from(token).toString()
            );
            return dtokenURI;
          })
        );

        const FetchURI = await Promise.all(
          tokenURI.map(async (ipfs) => {
            return ipfs.replace("ipfs://", `${startURL}`);
          })
        );

        const TokenList = [];

        const edition = await Promise.all(
          FetchURI.map(async (link) => {
            const response = await fetch(link);
            const data = await response.json();
            TokenList.push(data.edition);
          })
        );

        const newState = [...images.list];
        // const test = await Promise.all(
        //   newState.map(async (edition) => {
        //     //newState[edition - 1] = `./images/${edition}.png`;
        //   })
        // );

        for (let i = 0; i < TokenList.length; i++) {
          newState[setIndex(TokenList[i]) - 1] = `./images/${TokenList[i]}.png`;
        }

        //console.log(newState);

        setImages({
          list: newState,
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getWalletImage();
  }, []);

  return (
    <div id="bookContainer">
      <HTMLFlipBook width={380} height={465} showCover={true}>
        <div className="demoPage1"></div>
        <div className="demoPage2"></div>
        <div className="demoPage3">
          {/* <img src={require(`${images.list[0]}`)} alt="" />
          // <img src={require(`${images.list[1]}`)} alt="" />
          // <img src={require(`${images.list[2]}`)} alt="" />
          // <img src={require(`${images.list[3]}`)} alt="" /> */}
        </div>
        <div className="demoPage4">
          {/* <img src={require(`${images.list[4]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[5]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[6]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[7]}`)} alt="" /> */}
        </div>
        <div className="demoPage5">
          {/* <img src={require(`${images.list[8]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[9]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[10]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[11]}`)} alt="" /> */}
        </div>
        <div className="demoPage6">
          {/* <img src={require(`${images.list[12]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[13]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[14]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[15]}`)} alt="" /> */}
        </div>
        <div className="demoPage7">
          {/* <img src={require(`${images.list[16]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[17]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[18]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[19]}`)} alt="" /> */}
        </div>
        <div className="demoPage8">
          {/* <img src={require(`${images.list[20]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[21]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[22]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[23]}`)} alt="" /> */}
        </div>
        <div className="demoPage9">
          {/* <img src={require(`${images.list[24]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[25]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[26]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[27]}`)} alt="" /> */}
        </div>
        <div className="demoPage10">
          {/* <img src={require(`${images.list[28]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[29]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[30]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[31]}`)} alt="" /> */}
        </div>
        <div className="demoPage11">
          {/* <img src={require(`${images.list[32]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[33]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[34]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[35]}`)} alt="" /> */}
        </div>
        <div className="demoPage12">
          {/* <img src={require(`${images.list[36]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[37]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[38]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[39]}`)} alt="" /> */}
        </div>
        <div className="demoPage13">
          {/* <img src={require(`${images.list[40]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[41]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[42]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[43]}`)} alt="" /> */}
        </div>
        <div className="demoPage14">
          {/* <img src={require(`${images.list[44]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[45]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[46]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[47]}`)} alt="" /> */}
        </div>
        <div className="demoPage15">
          {/* <img src={require(`${images.list[48]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[49]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[50]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[51]}`)} alt="" /> */}
        </div>
        <div className="demoPage16">
          {/* <img src={require(`${images.list[52]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[53]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[54]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[55]}`)} alt="" /> */}
        </div>
        <div className="demoPage17">
          {/* <img src={require(`${images.list[56]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[57]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[58]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[59]}`)} alt="" /> */}
        </div>
        <div className="demoPage18">
          {/* <img src={require(`${images.list[60]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[61]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[62]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[63]}`)} alt="" /> */}
        </div>
        <div className="demoPage19">
          {/* <img src={require(`${images.list[64]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[65]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[66]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[67]}`)} alt="" /> */}
        </div>
        <div className="demoPage20">
          {/* <img src={require(`${images.list[68]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[69]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[70]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[71]}`)} alt="" /> */}
        </div>
        <div className="demoPage21">
          {/* <img src={require(`${images.list[72]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[73]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[74]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[75]}`)} alt="" /> */}
        </div>
        <div className="demoPage22">
          {/* <img src={require(`${images.list[76]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[77]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[78]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[79]}`)} alt="" /> */}
        </div>
        <div className="demoPage23">
          {/* <img src={require(`${images.list[80]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[81]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[82]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[83]}`)} alt="" /> */}
        </div>
        <div className="demoPage24">
          {/* <img src={require(`${images.list[84]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[85]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[86]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[87]}`)} alt="" /> */}
        </div>
        <div className="demoPage25">
          {/* <img src={require(`${images.list[88]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[89]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[90]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[91]}`)} alt="" /> */}
        </div>
        <div className="demoPage26">
          {/* <img src={require(`${images.list[92]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[93]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[94]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[95]}`)} alt="" /> */}
        </div>
        <div className="demoPage27">
          {/* <img src={require(`${images.list[96]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[97]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[98]}`)} alt="" /> */}
          {/* <img src={require(`${images.list[99]}`)} alt="" /> */}
        </div>
        <div className="demoPage28"></div>
      </HTMLFlipBook>
    </div>
  );
}
