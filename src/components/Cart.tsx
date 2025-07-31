import React, { useState } from 'react';
import { removeFromCart, clearCart } from '../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useAuth } from '../providers/AuthProvider';
import { createOrder } from '../services/firestore';
import type { OrderItem } from '../types';
import './Cart.css';

const Cart: React.FC = () => {
  const cart = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to place an order.');
      return;
    }

    const items: OrderItem[] = cart.map(item => ({
      productId: item.id!,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    try {
      await createOrder({
        userId: user.uid,
        items,
        total: totalPrice,
      });
      dispatch(clearCart());
      setCheckoutSuccess(true);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {checkoutSuccess && <p className="success-message">Checkout successful! Your order has been placed.</p>}
      {cart.length === 0 && !checkoutSuccess && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={String(item.id)} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <p>{item.title}</p>
            <p>Qty: {item.quantity}</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => item.id !== undefined && dispatch(removeFromCart(Number(item.id)))}>Remove</button>
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
