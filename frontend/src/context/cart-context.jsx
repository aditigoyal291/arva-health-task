import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the cart
export const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    const cart = localStorage.getItem('cart');
    if(cart){
      setCart(JSON.parse(cart));
    }
  }, [])

  const addToCart = (foodItem) => {
    const existingItem = cart.find((item) => item.food._id === foodItem._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.food._id === foodItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { food: foodItem, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (_id) => {
    const existingItem = cart.find((item) => item.food._id === _id);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.food._id !== _id));
    } else {
      setCart(
        cart.map((item) =>
          item.food._id === _id
        ? { ...item, quantity: item.quantity - 1 }
        : item
      )
    );
  }
};

const clearCart = () => {
  setCart([]);
  localStorage.setItem('cart', JSON.stringify(cart));
  };

  const getCartQty = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * item.food.itemPrice,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartQty,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
