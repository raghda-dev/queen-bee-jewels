// client/app/(main)/types/Cart.ts

import { StaticImageData } from 'next/image';

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  type: string;
  quantity: number; // ✅ Makes sense for Cart only!
  imageUrl: string | StaticImageData;
};

export type WishlistItemType = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  type: string;
  imageUrl: string | StaticImageData;
  // ✅ No quantity needed for wishlist
};
