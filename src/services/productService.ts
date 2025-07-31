import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import type { Product } from '../types';

const col = () => collection(db, 'products');

export const listProducts = async (): Promise<(Product & { id: string })[]> => {
  const snap = await getDocs(col());
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Product) }));
};
export const getProduct = async (id: string): Promise<Product & { id: string }> => {
  const s = await getDoc(doc(db, 'products', id));
  if (!s.exists()) throw new Error('Product not found');
  return { id: s.id, ...(s.data() as Product) };
};
export const createProduct = async (p: Product): Promise<string> => {
  const res = await addDoc(col(), { ...p, createdAt: serverTimestamp() });
  return res.id;
};
export const updateProductById = async (id: string, p: Partial<Product>): Promise<void> => {
  await updateDoc(doc(db, 'products', id), p as any);
};
export const deleteProductById = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id));
};
