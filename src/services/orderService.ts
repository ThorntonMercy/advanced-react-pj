import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, getDoc, doc } from 'firebase/firestore';
import type { OrderDoc } from '../types';

const ordersCol = () => collection(db, 'orders');
export const createOrder = async (order: Omit<OrderDoc, 'id' | 'createdAt'>) => {
  const res = await addDoc(ordersCol(), { ...order, createdAt: serverTimestamp() });
  return res.id;
};
export const listOrdersForUser = async (userId: string): Promise<(OrderDoc & { id: string })[]> => {
  const q = query(ordersCol(), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as OrderDoc) }));
};
export const getOrderById = async (id: string): Promise<OrderDoc & { id: string }> => {
  const s = await getDoc(doc(db, 'orders', id));
  if (!s.exists()) throw new Error('Order not found');
  return { id: s.id, ...(s.data() as OrderDoc) };
};
