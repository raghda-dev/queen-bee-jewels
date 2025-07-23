//client/app/(main)/lib/redux/wishlist/wishlistActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { shopifyQuery } from '../../../../../../lib/shopify/client';
import { GET_PRODUCTS_BY_ID } from '../../../../../../lib/shopify/products/queries';
import { RootState } from '../store';
import { WishlistItem } from './wishlistTypes';
import { getCartAsync } from '../cart/cartActions';
import { toast } from 'sonner';

export const addToWishlistAsync = createAsyncThunk<
  void, // Return type
  string, // Argument type (just productId)
  { state: RootState }
>(
  'wishlist/addToWishlistAsync',
  async (productId, { getState, dispatch, rejectWithValue }) => {
    try {
      const { cart, wishlist } = getState();

      const cartItems = cart?.items ?? [];
      const wishlistItems = wishlist?.items ?? [];

      const numericId = productId.includes('/')
        ? productId.split('/').pop()!
        : productId;

      const alreadyInCart = cartItems.some(
        (ci) => typeof ci.id === 'string' && ci.id.includes(numericId)
      );
      if (alreadyInCart) {
        toast('Item already in cart', { className: 'toast-warning' });
        return rejectWithValue('Item already in cart');
      }

      const alreadyInWishlist = wishlistItems.some(
        (wi) => typeof wi.id === 'string' && wi.id.includes(numericId)
      );
      if (alreadyInWishlist) {
        toast('Item already in wishlist', { className: 'toast-info' });
        return rejectWithValue('Item already in wishlist');
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: numericId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Wishlist API error:', res.status, errorText);
        throw new Error('Failed to save to wishlist');
      }

      await dispatch(getWishlistAsync());
      toast('Added to wishlist', { className: 'toast-success' });
    } catch (err) {
      toast('Failed to add to wishlist', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);

export const getWishlistAsync = createAsyncThunk<
  WishlistItem[],
  void,
  { rejectValue: string }
>('wishlist/getWishlist', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch wishlist from backend');

    const data = await res.json();
    const wishlistItems: { productId: string }[] = data.items;

    if (wishlistItems.length === 0) return [];

    const ids: string[] = wishlistItems.map(
      (item) => `gid://shopify/Product/${item.productId}`
    );

    const shopifyResponse: {
      nodes: Array<{
        id: string;
        title: string;
        description?: string;
        productType?: string;
        featuredImage?: { url: string };
        priceRange: {
          minVariantPrice: {
            amount: string;
          };
        };
      }>;
    } = await shopifyQuery(GET_PRODUCTS_BY_ID, { ids });

    const enrichedItems: WishlistItem[] = shopifyResponse.nodes.map(
      (product) => ({
        id: product.id,
        name: product.title,
        price: parseFloat(product.priceRange.minVariantPrice.amount),
        imageUrl: product.featuredImage?.url || '',
        description: product.description || '',
        type: product.productType || '',
      })
    );

    return enrichedItems;
  } catch (err) {
    toast('Could not load wishlist', { className: 'toast-error' });
    return rejectWithValue((err as Error).message);
  }
});

export const moveToCartAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('wishlist/moveToCart', async (productId, { rejectWithValue, dispatch }) => {
  try {
    const numericId = productId.includes('/')
      ? productId.split('/').pop()!
      : productId;

    const encodedId = encodeURIComponent(numericId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/move-to-cart/${encodedId}`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (!res.ok) throw new Error('Failed to move to cart');

    await dispatch(getWishlistAsync());
    await dispatch(getCartAsync());

    toast('Moved to cart', { className: 'toast-info' });
    return productId;
  } catch (err) {
    toast('Failed to move item to cart', { className: 'toast-error' });
    return rejectWithValue((err as Error).message);
  }
});

export const removeFromWishlistAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const numericId = productId.includes('/')
        ? productId.split('/').pop()!
        : productId;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${numericId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!res.ok) throw new Error('Failed to remove from wishlist');

      await dispatch(getCartAsync());
      await dispatch(getWishlistAsync());

      toast('Removed from wishlist', { className: 'toast-warning' });
      return productId;
    } catch (err) {
      toast('Could not remove item', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);
