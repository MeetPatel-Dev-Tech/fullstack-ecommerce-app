import React, { useEffect, useState } from "react";
import CartSummary from "../components/CartSummary";
import { getCartItems, removeFromCartByIndex } from "../utils/cartUtils";

const Cart = () => {
  const [items, setItems] = useState([]);

  const fetchItems = () => setItems(getCartItems());

  useEffect(() => {
    fetchItems();
    const handleUpdate = () => fetchItems();
    window.addEventListener("cartUpdated", handleUpdate);
    return () => window.removeEventListener("cartUpdated", handleUpdate);
  }, []);

  return <CartSummary items={items} onRemove={removeFromCartByIndex} />;
};

export default Cart;
