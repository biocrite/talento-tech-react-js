import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider, CartProvider } from "@context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LocalizationProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>
);
