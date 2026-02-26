import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCartItems(data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    await API.post("/cart/add", { productId });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await API.post("/cart/remove", { productId });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);