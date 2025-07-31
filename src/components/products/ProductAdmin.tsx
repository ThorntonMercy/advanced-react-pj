import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listProducts, createProduct, updateProductById, deleteProductById } from '../../services/productService';
import type { Product } from '../../types';

const empty: Product = { title: '', price: 0, category: '', description: '', image: '' };

const ProductAdmin: React.FC = () => {
  const qc = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: listProducts });
  const [editing, setEditing] = useState<Product & { id?: string }>(empty);

  const createMut = useMutation({ mutationFn: createProduct, onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }) });
  const updateMut = useMutation({ mutationFn: ({ id, data }: { id: string, data: Partial<Product> }) => updateProductById(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }) });
  const deleteMut = useMutation({ mutationFn: deleteProductById, onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }) });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing.id) await updateMut.mutateAsync({ id: editing.id, data: editing });
    else await createMut.mutateAsync(editing);
    setEditing(empty);
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: '0.5rem', maxWidth: 400 }}>
        <input placeholder="Title" value={editing.title} onChange={e=>setEditing({ ...editing, title: e.target.value })} />
        <input placeholder="Price" type="number" value={editing.price} onChange={e=>setEditing({ ...editing, price: Number(e.target.value) })} />
        <input placeholder="Category" value={editing.category} onChange={e=>setEditing({ ...editing, category: e.target.value })} />
        <input placeholder="Image URL" value={editing.image} onChange={e=>setEditing({ ...editing, image: e.target.value })} />
        <textarea placeholder="Description" value={editing.description} onChange={e=>setEditing({ ...editing, description: e.target.value })} />
        <div>
          <button type="submit">{editing.id ? 'Update' : 'Create'} Product</button>
          {editing.id && <button type="button" onClick={()=>setEditing(empty)} style={{ marginLeft: 8 }}>Cancel</button>}
        </div>
      </form>

      <ul>
        {products.map((p: any) => (
          <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <img src={p.image} alt={p.title} style={{ height: 40 }} />
            <strong>{p.title}</strong> — ${p.price.toFixed(2)} ({p.category})
            <button onClick={()=>setEditing(p)} style={{ marginLeft: 'auto' }}>Edit</button>
            <button onClick={()=>deleteMut.mutate(p.id)} style={{ marginLeft: 8, background: '#b91c1c' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductAdmin;