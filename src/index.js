import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
