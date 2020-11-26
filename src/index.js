/*    index.js    */

// Setup.
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

// Styles.
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

// Rendering function.
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
