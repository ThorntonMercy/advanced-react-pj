import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import ProductItem from '../components/ProductItem';
import Cart from '../components/Cart';
import { Product } from '../types';

// Mock Product data 
const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 10,
  category: 'Category',
  image: 'img.jpg',
  rating: { rate: 4.5, count: 10 },
};

// Integration test to check if adding an item to the cart reflects in the Cart component
test('adds item to cart and reflects in Cart component', () => {
  render(
    <Provider store={store}>
      <div>
        <ProductItem product={mockProduct} />
        <Cart />
      </div>
    </Provider>
  );

  // Add to cart
  fireEvent.click(screen.getByText(/Add to Cart/i));

  // Check if product is reflected in Cart
  expect(screen.getByText(/Qty: 1/)).toBeInTheDocument();
  expect(screen.getByTestId('cart-item-price')).toHaveTextContent('$10.00');
  expect(screen.getByTestId('cart-total-price')).toHaveTextContent('Total Price: $10.00');  
});