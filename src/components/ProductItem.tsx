import React from 'react';
import type { Product } from '../types';
import { addToCart } from '../store/slices/cartSlice';
import { useAppDispatch } from '../hooks';
import './ProductItem.css';

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating.rate} / 5</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;