import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the cart
export const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (foodItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.food._id === foodItem._id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.food._id === foodItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { food: foodItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (_id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.food._id === _id);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.food._id !== _id);
      } else {
        return prevCart.map((item) =>
          item.food._id === _id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]);
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
