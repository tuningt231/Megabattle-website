import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/common.css";
import { Api } from "./api";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={Api.normalizeURL('')}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
