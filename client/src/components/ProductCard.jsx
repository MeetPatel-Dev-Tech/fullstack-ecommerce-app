import React from "react";

const ProductCard = ({ product, onEdit, onDelete, onAddToCart }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "200px",
      }}
    >
      <img src={product.image} alt={product.name} width="100%" height="100" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product._id)}>Delete</button>
    </div>
  );
};

export default ProductCard;
