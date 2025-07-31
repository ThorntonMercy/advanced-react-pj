// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { calculateItemCount, calculateTotalPrice } from '../components/Cart';
// import axios from 'axios';

// // Mock axios to prevent actual API calls during testing
// jest.mock('axios');

// describe('Components: Cart', () => {
//   describe('calculateItemCount', () => {
//     test('should return 0 for an empty cart', () => {
//         const cart: CartItem[] = [];
//         expect(calculateItemCount(cart)).toBe(0);
//     });

//     test('should return the total item count', () => {
//         const cart: CartItem[] = [
//             { id: 1, price: 10, quantity: 2 },
//             { id: 2, price: 20, quantity: 3 },
//         ];
//         expect(calculateItemCount(cart)).toBe(5);
//     });
//   });

//   describe('calculateTotalPrice', () => {
//     test('should return 0 for an empty cart', () => {
//         const cart: CartItem[] = [];
//         expect(calculateTotalPrice(cart)).toBe(0);
//     });

//     test('should return the total price of items in the cart', () => {
//         const cart: CartItem[] = [
//             { id: 1, price: 10, quantity: 2 },
//             { id: 2, price: 20, quantity: 3 },
//         ];
//         expect(calculateTotalPrice(cart)).toBe(80);
//     });
//   });
// });