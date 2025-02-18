import { createContext, useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    if (product.stock > 0) {
      setCart((prevCart) => {
        const productExists = prevCart.find((item) => item.id === product.id);
        if (productExists) {
          if (productExists.quantity < product.stock) {
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            alert("No puedes agregar más de este producto, el stock es limitado.");
          }
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });

      updateProductStock(product.id, product.stock - 1);
    } else {
      alert("Este producto está agotado.");
    }
  };

  const updateProductStock = async (productId, newStock) => {
    try {
      const productRef = doc(db, "productos", productId);
      await updateDoc(productRef, { stock: newStock });
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId)); 
  };

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};