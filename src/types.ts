export interface Rating { rate: number; count: number }
export interface Product {
  id?: string; // Firestore document ID
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: Rating;
  ownerId?: string; 
}
export interface CartItem extends Product { quantity: number }
export interface UserProfile { uid: string; email: string; name?: string; address?: string }
export interface OrderItem { productId: string; title: string; price: number; quantity: number; image: string }
export interface OrderDoc { id?: string; userId: string; items: OrderItem[]; total: number; createdAt: unknown }
