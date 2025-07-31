import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../providers/AuthProvider';
import { getUserOrders } from '../../services/firestore';
import { Timestamp } from 'firebase/firestore';


const Orders: React.FC = () => {
  const { user: currentUser } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', currentUser?.uid],
    queryFn: () => getUserOrders(currentUser!.uid),
    enabled: !!currentUser,
  });

  if (!currentUser) return null;
  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="space-y-4 p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">My Orders</h2>
      {orders?.length === 0 && <p>No orders yet.</p>}

      {orders?.map(order => (
        <div key={order.id} className="border border-purple-200 p-4 rounded-xl shadow-md bg-white">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.createdAt instanceof Timestamp
  ? order.createdAt.toDate().toLocaleString()
  : 'Unknown'}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          <details className="mt-2">
            <summary className="cursor-pointer text-purple-600">View Items</summary>
            <ul className="list-disc pl-5 mt-2">
              {order.items.map(item => (
                <li key={item.productId}>
                  {item.title} (x{item.quantity}) - ${item.price}
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
};

export default Orders;