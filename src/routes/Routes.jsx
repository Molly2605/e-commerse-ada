import React from "react";
import {Route, Routes as RoutesReact } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import NotFound from "../pages/NotFound";
import { LoginForm } from "../pages/auth/Login";
import { RegisterForm } from "../pages/auth/Register";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";

const Routes = () => {
  const { user } = useAuth();

  return (
    <RoutesReact>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {user ? (
        <>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </>
      ) : (
        <>
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </>
      )}

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </RoutesReact>
  );
};

export default Routes;