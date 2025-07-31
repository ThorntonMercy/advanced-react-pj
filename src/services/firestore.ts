  import { addDoc, collection, serverTimestamp, query, where, getDocs} from 'firebase/firestore';
  import { db } from '../firebase';
  import type { OrderDoc } from '../types';

  
  export async function createOrder(order: Omit<OrderDoc, 'id' | 'createdAt'>) {
    const ordersRef = collection(db, 'orders');
    await addDoc(ordersRef, {
      ...order,
      createdAt: serverTimestamp(),
    });
  }
  
  export async function getUserOrders(userId: string): Promise<OrderDoc[]> {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
    );
  
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as OrderDoc[];
  }
