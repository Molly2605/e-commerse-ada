import { createContext, useContext, useState } from "react";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth();

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
              return prevCart;
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

  const checkout = async () => {
    if (!currentUser) {
      alert("Debes estar logueado para finalizar la compra.");
      return;
    }

    try {
      const order = {
        userEmail: currentUser.email,
        items: cart,
        total: getTotalPrice(),
        date: new Date().toISOString(),
      };

      await addDoc(collection(db, "orders"), order);

      clearCart();
      alert("Compra realizada con éxito.");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un error al procesar la compra.");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, clearCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};