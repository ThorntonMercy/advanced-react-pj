import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types'

interface CartItem extends Product {
  quantity: number
}

const initialState: CartItem[] = JSON.parse(sessionStorage.getItem('cart') || '[]')

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.find(item => item.id === action.payload.id)
      if (existing) existing.quantity += 1
      else state.push({ ...action.payload, quantity: 1 })
      sessionStorage.setItem('cart', JSON.stringify(state))
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const newState = state.filter(item => item.id !== action.payload)
      sessionStorage.setItem('cart', JSON.stringify(newState))
      return newState
    },
    clearCart: () => {
      sessionStorage.removeItem('cart')
      return []
    }
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
