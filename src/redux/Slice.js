// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}, // { productId: { id, name, price, quantity } }
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price,image } = action.payload;

      if (state.items[id]) {
        state.items[id].quantity += 1; // Increment quantity if item already in cart
      } else {
        state.items[id] = { id, name, price, quantity: 1 }; // Add new item
      }

      state.totalItems += 1;
      state.totalPrice += price;
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;

      if (state.items[id]) {
        const item = state.items[id];
        state.totalItems -= item.quantity;
        state.totalPrice -= item.price * item.quantity;

        delete state.items[id]; // Remove item from cart
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (state.items[id]) {
        const diff = quantity - state.items[id].quantity;
        state.items[id].quantity = quantity;

        state.totalItems += diff;
        state.totalPrice += diff * state.items[id].price;
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
