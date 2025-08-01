import { calculateItemCount, calculateTotalPrice, CartItem } from '../components/Cart';

const mockCart: CartItem[] = [
  { id: 1, price: 10, quantity: 2 },
  { id: 2, price: 5, quantity: 3 },
];

// This test checks if the `calculateItemCount` function correctly 
// sums the total item count

test('calculates total item count correctly', () => {
  expect(calculateItemCount(mockCart)).toBe(5);
});

// This test checks if the `calculateItemCount` function correctly sums the 
// quantities of items in the cart.

test('calculates total price correctly', () => {
  expect(calculateTotalPrice(mockCart)).toBe(10 * 2 + 5 * 3);
});