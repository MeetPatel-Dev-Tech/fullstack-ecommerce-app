import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import ProductCard from "../components/ProductCard";
import { addToCart, getCartItems } from "../utils/cartUtils";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    _id: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const fetchProducts = async (searchText = "") => {
    const res = await getProducts(searchText);
    setProducts(res.data);
  };

  const debouncedSearch = debounce((text) => fetchProducts(text), 300);

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) await updateProduct(form._id, form);
    else await addProduct(form);
    resetForm();
    fetchProducts(search);
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    const filteredCart = getCartItems().filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    window.dispatchEvent(new Event("cartUpdated"));
    fetchProducts(search);
  };

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", image: "", _id: null });
    setIsEditing(false);
  };

  const openCart = () => {
    setCartItems(getCartItems());
    setCartVisible(true);
  };

  return (
    <div>
      <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        {["name", "price", "image", "description"].map((field) => (
          <input
            key={field}
            type={field === "price" ? "number" : "text"}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required={field !== "image"}
          />
        ))}
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <hr />
      <input
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

      <button style={{ float: "right" }} onClick={openCart}>
        🛒 View Cart
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={addToCart}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {cartVisible && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#fff",
            border: "1px solid #ccc",
            padding: 20,
          }}
        >
          <h3>Your Cart</h3>
          <button onClick={() => setCartVisible(false)}>Close</button>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
