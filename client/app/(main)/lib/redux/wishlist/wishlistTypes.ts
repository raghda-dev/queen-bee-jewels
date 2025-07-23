// types/WishlistItem.ts


export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string; // required
  type: string;        // required
  imageUrl: string;
};
