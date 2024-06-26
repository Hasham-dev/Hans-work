import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    font-family: 'Cabin Sketch', cursive;

}
  body {
    font-family: 'Cabin Sketch', cursive;

    background-color: #121212;
    color: #ffffff;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    /* padding: 2rem; */
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: #1E1E1E;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
  }
`;

export default GlobalStyle;
