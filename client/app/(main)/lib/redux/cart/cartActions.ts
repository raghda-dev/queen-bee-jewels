// client/app/(main)/lib/redux/cart/cartActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from './cartTypes';
import { shopifyQuery } from '../../../../../../lib/shopify/client';
import { GET_PRODUCTS_BY_ID } from '../../../../../../lib/shopify/products/queries';
import { getWishlistAsync } from '../wishlist/wishlistActions';
import { RootState, AppDispatch } from '../store';
import { toast } from 'sonner';
import { clearGuestItems } from './cartSlice';
import { removeFromWishlistAsync } from '../wishlist/wishlistActions';



// NEW addToCartAsync — returns void, refreshes cart from server after adding
export const addToCartAsync = createAsyncThunk<
  void,
  CartItem,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>(
  'cart/addToCartAsync',
  async (item, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const cart = state.cart.items;
      const numericId = item.id.includes('/') ? item.id.split('/').pop()! : item.id;

      // Prevent duplicates in server cart (based on current Redux snapshot)
      const exists = cart.some(ci =>
        typeof ci.id === 'string'
          ? ci.id.includes(String(numericId))
          : String(ci.id).includes(String(numericId))
      );
      if (exists) {
        toast('This item is already in your cart', { className: 'toast-warning' });
        return rejectWithValue('Item already exists');
      }

      // Call backend to add to cart
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: numericId, quantity: item.quantity }),
      });

      if (!res.ok) throw new Error('Failed to save to backend');

      // Success feedback
      toast('Added to cart', { className: 'toast-success' });

      // If item exists in the server wishlist, remove it.
      // Use current state snapshot's wishlist to avoid unnecessary network calls.
      try {
        const wishlistItems = state.wishlist?.items ?? [];
        const inWishlist = wishlistItems.some(wi =>
          typeof wi.id === 'string'
            ? wi.id.includes(String(numericId))
            : String(wi.id).includes(String(numericId))
        );

        if (inWishlist) {
          // dispatch removal; swallow errors (we will still refresh cart)
          // Note: removeFromWishlistAsync will update wishlist and may call getCartAsync()
          // but to guarantee a single final cart load, we'll run getCartAsync() below too.
          // We await it to allow server-side wishlist removal to complete.
          // (If you prefer not to await, you can drop the await; but awaiting reduces race.)
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          await dispatch(removeFromWishlistAsync(numericId)).catch((e) => {
            // eslint-disable-next-line no-console
            console.warn('[addToCartAsync] removeFromWishlistAsync failed', e);
          });
        }
      } catch (e) {
        // swallow wishlist-check errors — they don't negate cart success
        // eslint-disable-next-line no-console
        console.warn('[addToCartAsync] wishlist-sync check failed', e);
      }

      // Finally: refresh cart from server to get canonical cart items (avoid duplicates)
      // Await so subsequent UI flows see the fresh cart state.
      await dispatch(getCartAsync());

      // Done. Returning void — cart state updated by getCartAsync.
      return;
    } catch (err) {
      toast('Failed to add to cart', { className: 'toast-error' });
      return rejectWithValue((err as Error).message || String(err));
    }
  }
);


// Fetch cart and enrich from Shopify

export const getCartAsync = createAsyncThunk<CartItem[]>(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to fetch cart from backend');

      const data = await res.json();
      const cartItems: { productId: string; quantity: number }[] = data.items;

      if (cartItems.length === 0) return [];

      const ids: string[] = cartItems.map(
        (item) => `gid://shopify/Product/${item.productId}`
      );

      const shopifyResponse: {
        nodes: Array<{
          id: string;
          title: string;
          description: string;
          productType?: string;
          featuredImage?: { url: string };
          priceRange: {
            minVariantPrice: {
              amount: string;
            };
          };
        }>;
      } = await shopifyQuery(GET_PRODUCTS_BY_ID, { ids });

      // Map shopify product data with cart quantities
      const enrichedItems: CartItem[] = shopifyResponse.nodes.map((product) => {
        const numericId = product.id.split('/').pop();
        const matching = cartItems.find((item) => item.productId === numericId);

        return {
          id: product.id,
          name: product.title,
          price: parseFloat(product.priceRange.minVariantPrice.amount),
          imageUrl: product.featuredImage?.url || '',
          description: product.description || '',
          type: product.productType || '',
          quantity: matching?.quantity || 1,
        };
      });

      return enrichedItems;
    } catch (err) {
      toast('Could not load cart', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);


// Move cart item -> wishlist (this thunk dispatches other thunks, so include dispatch in generics)
export const moveToWishlistAsync = createAsyncThunk<
  string,
  string,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>('cart/moveToWishlist', async (productId, { rejectWithValue, dispatch }) => {
  try {
    const numericId = productId.includes('/')
      ? (productId.split('/').pop() ?? productId)
      : productId;

    const encodedId = encodeURIComponent(numericId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/move-to-wishlist/${encodedId}`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (!res.ok) throw new Error('Failed to move to wishlist');

    // Refresh both cart and wishlist
    await dispatch(getCartAsync());
    await dispatch(getWishlistAsync());

    toast('Moved to wishlist', { className: 'toast-info' });
    return productId;
  } catch (err) {
    toast('Failed to move item to wishlist', { className: 'toast-error' });
    return rejectWithValue((err as Error).message);
  }
});

// Remove from cart (also dispatches)
export const removeFromCartAsync = createAsyncThunk<
  string,
  string,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>('cart/removeFromCart', async (productId, { rejectWithValue, dispatch }) => {
  try {
    const numericId = productId.includes('/')
      ? (productId.split('/').pop() ?? productId)
      : productId;

    const encodedId = encodeURIComponent(numericId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/${encodedId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    if (!res.ok) throw new Error('Failed to delete item');

    // Refresh both cart and wishlist after removal
    await dispatch(getCartAsync());
    await dispatch(getWishlistAsync());

    toast('Removed from cart', { className: 'toast-warning' });
    return productId;
  } catch (err) {
    toast('Could not remove item', { className: 'toast-error' });
    return rejectWithValue((err as Error).message);
  }
});

// =============== New Guest Cart Thunks ===============

export const addToGuestCart = createAsyncThunk<
  CartItem,
  CartItem,
  { state: RootState; rejectValue: string }
>(
  'cart/addToGuestCart',
  async (item, { rejectWithValue }) => {
    if (typeof window === 'undefined') return rejectWithValue('No localStorage');

    try {
      const numericId = item.id.includes('/') ? item.id.split('/').pop()! : item.id;

      const raw = localStorage.getItem('guestCart');
      const existing: CartItem[] = raw ? JSON.parse(raw) : [];

      const exists = existing.some((ci) => String(ci.id) === numericId);

      if (exists) {
        toast('This item is already in your cart', { className: 'toast-warning' });
        return existing.find((ci) => String(ci.id) === numericId)!;
      }

      const itemToStore: CartItem = { ...item, id: numericId };
      const newArr = [...existing, itemToStore];

      localStorage.setItem('guestCart', JSON.stringify(newArr));
      console.log('[addToGuestCart] persisted guestCart', newArr);

      toast('Added to cart', { className: 'toast-success' });
      return itemToStore;
    } catch (err) {
      console.error('[addToGuestCart] unexpected error', err);
      toast('Failed to add to guest cart', { className: 'toast-error' });
      return rejectWithValue(String(err));
    }
  }
);



export const loadGuestCartFromStorage = createAsyncThunk<CartItem[], void>(
  'cart/loadGuestCartFromStorage',
  async () => {
    try {
      const raw = localStorage.getItem('guestCart');
      console.log(
        '[loadGuestCartFromStorage] raw localStorage guestCart:',
        raw
      );
      if (!raw) return [];
      const parsed: CartItem[] = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(parsed)) {
        console.warn('[loadGuestCartFromStorage] unexpected format', parsed);
        return [];
      }
      const normalized: CartItem[] = parsed.map((p) => {
        const idStr = typeof p.id === 'string' ? p.id : String(p.id ?? '');
        const numericId = idStr.includes('/') ? idStr.split('/').pop()! : idStr;
        return {
          id: numericId,
          name: p.name ?? 'Unnamed product',
          price: Number(p.price) || 0,
          imageUrl: p.imageUrl ?? '',
          description: p.description ?? '',
          type: p.type ?? '',
          quantity: Number(p.quantity) || 1,
        } as CartItem;
      });
      console.log('[loadGuestCartFromStorage] normalized:', normalized);
      return normalized;
    } catch (err) {
      console.error(
        '[loadGuestCartFromStorage] error reading localStorage',
        err
      );
      return [];
    }
  }
);

// Migrate guest cart -> server (already had dispatch generic; kept as-is)
export const migrateGuestCartToServer = createAsyncThunk<
  void,
  void,
  { state: RootState; dispatch: AppDispatch }
>('cart/migrateGuestCartToServer', async (_, { getState, dispatch }) => {
  const guestItems = getState().cart.guestItems || [];
  if (!guestItems.length) return;

  // Clear Redux and localStorage first
  dispatch(clearGuestItems());
  try {
    localStorage.removeItem('guestCart');
  } catch (e) {
    console.warn('Failed to remove guestCart from localStorage', e);
  }

  // Send guest items to backend
  for (const item of guestItems) {
    try {
      const numericId = item.id.includes('/')
        ? item.id.split('/').pop()!
        : item.id;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: numericId, quantity: item.quantity }),
      });

      if (!res.ok) {
        console.warn(
          'Failed to migrate item to server cart',
          item,
          await res.text()
        );
      }
    } catch (err) {
      console.error('Error migrating guest cart item', err);
    }
  }

  await dispatch(getCartAsync());
});

// Remove item from guest cart in localStorage
export const removeFromGuestCart = createAsyncThunk<
  string, // returned payload: removed numeric id
  string, // arg: productId (either gid or numeric)
  { state: RootState }
>('cart/removeFromGuestCart', async (productId) => {
  try {
    // normalize numeric id
    const numericId = productId.includes('/')
      ? productId.split('/').pop()!
      : productId;

    const raw = localStorage.getItem('guestCart');
    const guestItems: CartItem[] = raw ? JSON.parse(raw) : [];

    // filter out any item whose id matches numericId or contains it (gid/numeric forms)
    const filtered = guestItems.filter((i) => {
      const iid = String(i.id || '');
      return !(
        iid === productId ||
        iid === numericId ||
        iid.includes(numericId) ||
        iid.endsWith(`/${numericId}`)
      );
    });

    try {
      localStorage.setItem('guestCart', JSON.stringify(filtered));
    } catch (e) {
      console.warn('Failed to persist guestCart after removal', e);
    }

    toast('Removed from cart', { className: 'toast-warning' });
    return numericId;
  } catch (err) {
    console.error('removeFromGuestCart failed', err);
    throw err; // so thunk rejects
  }
});
