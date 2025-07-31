import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, CartItem } from '../../types';

const loadCart = (): CartItem[] => {
  try { const raw = sessionStorage.getItem('cart'); return raw ? JSON.parse(raw) as CartItem[] : [] } catch { return [] }
};
const saveCart = (state: CartItem[]) => { try { sessionStorage.setItem('cart', JSON.stringify(state)) } catch {} };

const initialState: CartItem[] = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1; else state.push({ ...action.payload, quantity: 1 });
      saveCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string | number | undefined>) => {
      const newState = state.filter(i => i.id !== action.payload);
      saveCart(newState); return newState;
    },
    clearCart: () => { saveCart([]); return [] },
  }
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;