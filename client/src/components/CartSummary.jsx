import React from "react";

const CartSummary = ({ items, onRemove }) => (
  <div style={{ marginBottom: "1rem" }}>
    <h2>🛒 Cart ({items.length} items)</h2>
    {items.length === 0 ? (
      <p>No items in cart.</p>
    ) : (
      items.map((item, idx) => (
        <div
          key={idx}
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
          <span>
            {item.name} - ₹{item.price}
          </span>
          <button onClick={() => onRemove(idx)}>❌ Remove</button>
        </div>
      ))
    )}
  </div>
);

export default CartSummary;
