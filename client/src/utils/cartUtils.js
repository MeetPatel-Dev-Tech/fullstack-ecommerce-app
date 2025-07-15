export const getCartItems = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const setCartItems = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product) => {
  const current = getCartItems();
  setCartItems([...current, product]);
};

export const removeFromCartByIndex = (index) => {
  const current = getCartItems();
  current.splice(index, 1);
  setCartItems([...current]);
};
