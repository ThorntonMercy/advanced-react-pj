import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../services/orderService';

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useQuery({ queryKey: ['order', id], queryFn: () => getOrderById(id!), enabled: !!id });
  if (isLoading) return <p>Loading…</p>;
  if (error || !order) return <p>Order not found.</p>;
  return (
    <div>
      <h2>Order {order.id}</h2>
      <p>Total: ${order.total.toFixed(2)}</p>
      <ul>
        {order.items.map((it: any, idx: number) => (
          <li key={idx}>
            <img src={it.image} alt={it.title} style={{ height: 40, verticalAlign: 'middle', marginRight: 8 }} />
            {it.title} — ${it.price.toFixed(2)} × {it.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OrderDetail;