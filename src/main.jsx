import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider, CartProvider, AuthProvider } from "@context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <LocalizationProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
