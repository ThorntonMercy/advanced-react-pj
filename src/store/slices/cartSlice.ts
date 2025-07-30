import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, CartItem } from '../../types';

const loadCart = (): CartItem[] => {
  try {
    const raw = sessionStorage.getItem('cart');
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const saveCart = (state: CartItem[]): void => {
  try {
    sessionStorage.setItem('cart', JSON.stringify(state));
  } catch {
    // ignore
  }
};

const initialState: CartItem[] = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
      saveCart(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const newState = state.filter((item) => item.id !== action.payload);
      saveCart(newState);
      return newState;
    },
    clearCart: () => {
      saveCart([]);
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
