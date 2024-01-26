import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    favorites: [],
    totalItems: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      state.totalItems++;
      if (!existingItem) {
        state.cart.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (!existingItem) {
        return;
      }
      if (existingItem.quantity > 1) {
        existingItem.quantity--;

        state.totalItems--;
      } else {
        state.cart = state.cart.filter((item) => item.id !== id);

        state.totalItems--;
      }
    },
    addToFavorites(state, action) {
      const newItem = action.payload;
      const existingItem = state.favorites.find(
        (item) => item.id === newItem.id,
      );
      if (!existingItem) {
        state.favorites.push({ ...newItem });
      }
    },
    removeFavorite(state, action) {
      const id = action.payload;
      state.favorites = state.favorites.filter((item) => item.id !== id);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
