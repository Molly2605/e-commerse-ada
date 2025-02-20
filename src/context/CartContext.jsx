import { createContext, useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    try {
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
              alert("SIN STOCK!");
            }
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });

        await updateProductStock(product.id, product.stock - 1);
      } else {
        alert("SIN STOCK!");
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      alert("Hubo un problema al agregar el producto al carrito.");
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
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};