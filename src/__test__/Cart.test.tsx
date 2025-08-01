import type { CartItem } from '../types';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Cart from '../components/Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/slices/cartSlice';

const renderWithStore = (preloadedState: { cart: CartItem[] } = { cart: [] }) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

// Mock Cart Item data 
const sampleCartItem: CartItem = {
  id: 1,
  title: 'Test Product',
  image: 'https://via.placeholder.com/150',
  price: 10,
  quantity: 2,
  category: 'Category',
  description: 'Test Description',
  rating: {
    rate: 4.5,
    count: 10,
  },
};

// Unit tests for Cart component


// ensures the Cart component renders correctly and handles actions like adding, 
// removing, and checking out items in the cart.
describe('<Cart />', () => {
  test('renders empty cart message when cart is empty', () => {
    renderWithStore({ cart: [] });

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders items in the cart', () => {
    renderWithStore({ cart: [sampleCartItem] });

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/Qty: 2/)).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument(); // 10 * 2
  });

  test('removes item from cart when "Remove" is clicked', () => {
    renderWithStore({ cart: [sampleCartItem] });

    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);

    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });

  test('clears cart and shows success message on checkout', async () => {
    jest.useFakeTimers();

    renderWithStore({ cart: [sampleCartItem] });

    const checkoutButton = screen.getByText(/checkout/i);
    fireEvent.click(checkoutButton);

    expect(screen.getByText(/checkout successful/i)).toBeInTheDocument();
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText(/checkout successful/i)).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});
