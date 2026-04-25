// client/app/(main)/lib/redux/cart/cartTypes.ts

// cartTypes.ts
export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  description: string;
  type: string;
  oldPrice?: number;
};
