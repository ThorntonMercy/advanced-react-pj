import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductItem from '../components/ProductItem';
import { Provider } from 'react-redux';
import { store } from '../store';
import { type Product } from '../types';

// Mock Product data
const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 19.99,
  category: 'Test Category',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 120,
  },
};

// Unit tests for ProductItem component

test('renders product details correctly', () => {
  render(
    <Provider store={store}>
      <ProductItem product={mockProduct} />
    </Provider>
  );
// Check if product details are displayed (title, description, category, price)
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
  expect(screen.getByText(/Category: Test Category/i)).toBeInTheDocument();
  expect(screen.getByText(/\$19.99/)).toBeInTheDocument();
});

// Checks if adding a product to the cart dispatches the correct action
test('dispatches addToCart when "Add to Cart" is clicked', () => {
  render(
    <Provider store={store}>
      <ProductItem product={mockProduct} />
    </Provider>
  );

  // Simulate clicking the "Add to Cart" button
  const button = screen.getByText(/Add to Cart/i);
  fireEvent.click(button);

  // Check if the product was added to the cart
  const state = store.getState().cart;
  expect(state.some((item) => item.id === mockProduct.id)).toBe(true);
});