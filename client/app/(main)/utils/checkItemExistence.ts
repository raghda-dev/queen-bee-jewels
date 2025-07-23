//client/app/(main)/utils/checkItemExistence.ts

import  { CartItem }  from '../lib/redux/cart/cartTypes';
import  { WishlistItem }  from '../lib/redux/wishlist/wishlistTypes';

export const isInCart = (productId: string, cart: CartItem[]) => {
  return cart.some(item => item.id.includes(productId));
  
};

export const isInWishlist = (productId: string, wishlist: WishlistItem[]) => {
  return wishlist.some(item => item.id.includes(productId));
};
