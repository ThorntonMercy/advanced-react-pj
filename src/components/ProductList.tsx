import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductItem from './ProductItem';
import type { Product } from '../types';
import './ProductList.css';

const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(
    'https://fakestoreapi.com/products/categories'
  );
  return data;
};

const fetchProducts = async (category?: string): Promise<Product[]> => {
  const url = category && category.length > 0
    ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
    : 'https://fakestoreapi.com/products';
  const { data } = await axios.get<Product[]>(url);
  return data;
};

const ProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } =
    useQuery<string[]>({ queryKey: ['categories'], queryFn: fetchCategories });

  const { data: products = [], isLoading: productsLoading, error: productsError } =
    useQuery<Product[]>({
      queryKey: ['products', selectedCategory],
      queryFn: () => fetchProducts(selectedCategory),
    });

  if (categoriesLoading || productsLoading) return <p>Loading…</p>;
  if (categoriesError || productsError) return <p>Failed to load our available products. Please try again.</p>;

  return (
    <div>
      <label htmlFor="category-select" className="sr-only">Category</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;