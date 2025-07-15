import React from "react";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";

const App = () => (
  <div style={{ padding: "2rem" }}>
    <h1>🛍️ My E-Commerce Store</h1>
    <Cart />
    <ProductList />
  </div>
);

export default App;
