import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { listProducts } from '../services/productService';
import ProductItem from './ProductItem';
import type { Product } from '../types';
import './ProductList.css';

const ProductList: React.FC = () => {
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => await listProducts(),
  });

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div>
      <div className="product-list">
        {products.map((p: any) => (
          <ProductItem key={p.id} product={{ ...p }} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
