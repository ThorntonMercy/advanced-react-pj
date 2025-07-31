import React, { useState } from 'react';
import { removeFromCart, clearCart } from '../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import './Cart.css';

export type CartItem = {
  id: number;
  price: number;
  quantity: number
};

export function calculateItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function calculateTotalPrice(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const Cart: React.FC = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const totalItems = calculateItemCount(cart);
  const totalPrice = calculateTotalPrice(cart);

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckoutSuccess(true);
    // this will clear the cart and show a success message so we know why it is empty
    setTimeout(() => setCheckoutSuccess(false), 3000);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {checkoutSuccess && (
        <p className="success-message">Checkout successful! Your cart is now empty.</p> 
      )} 
      {cart.length === 0 && !checkoutSuccess && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <p>{item.title}</p>
            <p>Qty: {item.quantity}</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        </div>
      ))}
      <hr />
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
