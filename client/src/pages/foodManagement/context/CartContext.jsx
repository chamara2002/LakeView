import React, { createContext, useReducer, useContext } from "react";

// Create context
const CartContext = createContext();

// Define actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (existingItem) {
        // If the item exists, update the quantity
        return state.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      // If the item does not exist, add it with the specified quantity
      return [...state, { ...action.payload, quantity: action.payload.quantity }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "ADD_MULTIPLE_TO_CART":
      const newItems = action.payload;
      return newItems.reduce((acc, newItem) => {
        const existingItem = acc.find((item) => item._id === newItem._id);
        if (existingItem) {
          return acc.map((item) =>
            item._id === newItem._id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }
        return [...acc, { ...newItem, quantity: newItem.quantity }];
      }, state);

    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};
