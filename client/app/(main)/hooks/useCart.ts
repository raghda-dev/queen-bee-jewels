import { useState } from 'react';
import { CartItemType } from '../home/@modal/(.)cart/page';  // Importing CartItemType for type safety

export default function useCart() {
  // Initial cart state
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: '1',
      name: 'Silver Ring',
      price: 20,
      oldPrice: 29.5,
      description: 'A timeless silver piece for elegance.',
      type: 'Silver',
      quantity: 1,
      imageUrl: '/staticAssets/images/fallback.jpeg',  // Placeholder image
    },
    {
      id: '2',
      name: 'Gold Necklace',
      price: 45,
      description: 'Elegant necklace with a modern touch.',
      type: 'Gold',
      quantity: 2,
      imageUrl: '/staticAssets/images/fallback.jpeg',  // Placeholder image
    },
  ]);

  // Calculate subtotal, discount, and total price
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 5;
  const shipping = 10;
  const totalPrice = subtotal - discount + shipping;

  // Functions to manage cart items
  const incrementQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToWishlist = (id: string) => {
    console.log(`Moved item ${id} to wishlist`);
    removeItem(id);
  };

  return {
    cartItems,
    subtotal,
    discount,
    shipping,
    totalPrice,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    moveToWishlist,
  };
}
