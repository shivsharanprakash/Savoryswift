import React, { createContext, useContext, useReducer } from 'react';
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    case "UPDATE":
      return state.map((food) =>
        food.id === action.id && food.size === action.size
          ? { ...food, qty: food.qty + action.qty, price: food.price + action.price }
          : food
      );
    case "DROP":
      return []; // Empty array
    default:
      console.log("Error in reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
