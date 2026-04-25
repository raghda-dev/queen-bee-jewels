// client/app/(main)/lib/redux/wishlist/wishlistActions.ts


import { createAsyncThunk } from '@reduxjs/toolkit';
import { shopifyQuery } from '../../../../../../lib/shopify/client';
import { GET_PRODUCTS_BY_ID } from '../../../../../../lib/shopify/products/queries';
import { RootState, AppDispatch } from '../store';
import { WishlistItem } from './wishlistTypes';
import { CartItem } from '../cart/cartTypes';
import { getCartAsync, addToGuestCart } from '../cart/cartActions';
import { toast } from 'sonner';

/** Minimal typing for shopifyQuery results we use here */
type ShopifyNodesResponse = {
  nodes: Array<{
    id: string;
    title: string;
    description?: string;
    productType?: string;
    featuredImage?: { url?: string } | null;
    priceRange?: { minVariantPrice?: { amount?: string } } | null;
  }>;
};

// -------------------- Add to Wishlist (handles guest & logged-in) --------------------
export const addToWishlistAsync = createAsyncThunk<
  void,
  string,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>(
  'wishlist/addToWishlistAsync',
  async (productId, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.user.user;
      const wishlistItems: WishlistItem[] = state.wishlist.items ?? [];
      const cartItems = state.cart.items ?? [];
      const guestCartItems = state.cart.guestItems ?? [];

      const numericId = productId.includes('/') ? productId.split('/').pop()! : productId;

      // Prevent adding if already in server cart OR guest cart
      const alreadyInServerCart = cartItems.some(
        (ci) => typeof ci.id === 'string' && ci.id.includes(numericId)
      );
      const alreadyInGuestCart = guestCartItems.some((gi) => {
        const gid = typeof gi.id === 'string' ? gi.id : String(gi.id);
        return gid.includes(numericId) || gid === numericId;
      });

      if (alreadyInServerCart || alreadyInGuestCart) {
        toast('Item already in cart', { className: 'toast-warning' });
        return rejectWithValue('Item already in cart');
      }

      // Prevent duplicates in wishlist (server-side list)
      if (wishlistItems.some((wi) => typeof wi.id === 'string' && wi.id.includes(numericId))) {
        toast('Item already in wishlist', { className: 'toast-info' });
        return rejectWithValue('Item already in wishlist');
      }

      // Guest -> persist enriched item to localStorage (so drawer shows image & name)
      if (!user) {
        // Try to fetch Shopify product details to enrich the guest item
        const gid = `gid://shopify/Product/${numericId}`;
        try {
          const shopifyResp = await shopifyQuery<ShopifyNodesResponse>(GET_PRODUCTS_BY_ID, { ids: [gid] });
          const node = shopifyResp.nodes && shopifyResp.nodes[0];

          const guestItem: WishlistItem = node
            ? {
                id: node.id, // store full gid to be consistent
                name: node.title ?? 'Unnamed product',
                price: parseFloat(node.priceRange?.minVariantPrice?.amount ?? '0'),
                imageUrl: node.featuredImage?.url ?? '',
                description: node.description ?? '',
                type: node.productType ?? '',
              }
            : {
                id: numericId,
                name: 'Unnamed product',
                price: 0,
                imageUrl: '',
                description: '',
                type: '',
              };

          const raw = localStorage.getItem('guestWishlist');
          const existing: WishlistItem[] = raw ? JSON.parse(raw) : [];

          // Avoid duplicates: check by numeric id presence in either gid or numeric id form
          const exists = existing.some((i) => {
            const iid = String(i.id);
            return iid.includes(numericId) || iid === numericId || iid === node?.id;
          });

          if (exists) {
            toast('Already in wishlist', { className: 'toast-warning' });
            return rejectWithValue('Item already exists');
          }

          const newArr = [...existing, guestItem];
          try {
            localStorage.setItem('guestWishlist', JSON.stringify(newArr));
          } catch (e) {
            console.error('Failed to persist guest wishlist', e);
          }

          toast('Added to wishlist', { className: 'toast-success' });
          return;
        } catch (err) {
          // If Shopify lookup fails, fallback to minimal guest item (still usable)
          console.warn('Shopify enrichment failed while adding guest wishlist item', err);
          const guestItem: WishlistItem = {
            id: numericId,
            name: 'Unnamed product',
            price: 0,
            imageUrl: '',
            description: '',
            type: '',
          };

          const raw = localStorage.getItem('guestWishlist');
          const existing: WishlistItem[] = raw ? JSON.parse(raw) : [];
          const exists = existing.some((i) => String(i.id).includes(numericId) || String(i.id) === numericId);

          if (exists) {
            toast('Already in wishlist', { className: 'toast-warning' });
            return rejectWithValue('Item already exists');
          }

          const newArr = [...existing, guestItem];
          try {
            localStorage.setItem('guestWishlist', JSON.stringify(newArr));
          } catch (e) {
            console.error('Failed to persist guest wishlist', e);
          }
          toast('Added to wishlist', { className: 'toast-success' });
          return;
        }
      }

      // Logged-in user -> call backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: numericId }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        console.error('Wishlist API error', res.status, errText);
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

// -------------------- Guest Wishlist storage helpers --------------------
export const loadGuestWishlistFromStorage = createAsyncThunk<WishlistItem[], void>(
  'wishlist/loadGuestWishlistFromStorage',
  async () => {
    try {
      const raw = localStorage.getItem('guestWishlist');
      if (!raw) return [];
      const parsed = JSON.parse(raw) as WishlistItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Failed to load guest wishlist', err);
      return [];
    }
  }
);

// ---- NEW: addToGuestWishlist (exports expected by wishlistSlice) ----
export const addToGuestWishlist = createAsyncThunk<WishlistItem, WishlistItem, { state: RootState; rejectValue: string }>(
  'wishlist/addToGuestWishlist',
  async (item, { getState, rejectWithValue }) => {
    try {
      const guestItems = getState().wishlist.guestItems || [];
      const exists = guestItems.some((i) => i.id === item.id);
      if (exists) {
        toast('Already in wishlist', { className: 'toast-warning' });
        return rejectWithValue('Item already exists');
      }
      const newGuestItems = [...guestItems, item];
      try {
        localStorage.setItem('guestWishlist', JSON.stringify(newGuestItems));
      } catch (e) {
        console.error('Failed to persist guest wishlist', e);
      }
      toast('Added to wishlist', { className: 'toast-success' });
      return item;
    } catch (err) {
      toast('Failed to add to wishlist', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);


export const migrateGuestWishlistToServer = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
  'wishlist/migrateGuestWishlistToServer',
  async (_, { dispatch }) => {
    try {
      const raw = localStorage.getItem('guestWishlist');
      const guestItems: WishlistItem[] = raw ? JSON.parse(raw) : [];
      if (!guestItems || guestItems.length === 0) return;

      // Remove from localStorage first to avoid duplicates on retries
      try {
        localStorage.removeItem('guestWishlist');
      } catch (e) {
        console.warn('Failed to remove guestWishlist', e);
      }

      for (const item of guestItems) {
        const numericId = item.id.includes('/') ? item.id.split('/').pop()! : item.id;
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: numericId }),
          });
          if (!res.ok) {
            console.warn('Failed to migrate wishlist item', numericId, await res.text().catch(() => ''));
          }
        } catch (err) {
          console.error('Error migrating wishlist item', item, err);
        }
      }

      // refresh server wishlist
      await dispatch(getWishlistAsync());
    } catch (err) {
      console.error('migrateGuestWishlistToServer failed', err);
    }
  }
);



// -------------------- Get wishlist (guest + logged-in) --------------------

export const getWishlistAsync = createAsyncThunk<WishlistItem[], void, { state: RootState; rejectValue: string }>(
  'wishlist/getWishlist',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.user.user;

      // Guest -> localStorage + optional Shopify enrichment
      if (!user) {
        const raw = localStorage.getItem('guestWishlist');
        if (!raw) return [];
        const guestItems: WishlistItem[] = JSON.parse(raw) as WishlistItem[];
        if (!guestItems.length) return [];

        // Build shopify ids to enrich (if present)
        const ids = guestItems.map((i) =>
          i.id.includes('/') ? `gid://shopify/Product/${i.id.split('/').pop()!}` : `gid://shopify/Product/${i.id}`
        );

        try {
          const shopifyResponse = await shopifyQuery<ShopifyNodesResponse>(GET_PRODUCTS_BY_ID, { ids });
          const enriched = shopifyResponse.nodes.map((node) => ({
            id: node.id,
            name: node.title,
            price: parseFloat(node.priceRange?.minVariantPrice?.amount ?? '0'),
            imageUrl: node.featuredImage?.url ?? '',
            description: node.description ?? '',
            type: node.productType ?? '',
          } as WishlistItem));
          return enriched;
        } catch (err) {
          console.warn('Shopify enrichment failed for guest wishlist', err);
          return guestItems;
        }
      }

      // Logged-in user -> backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch wishlist from backend');

      const data = await res.json();
      const wishlistItemsRaw: { productId: string }[] = data.items ?? [];
      if (!wishlistItemsRaw.length) return [];

      const ids = wishlistItemsRaw.map((i) => `gid://shopify/Product/${i.productId}`);
      const shopifyResponse = await shopifyQuery<ShopifyNodesResponse>(GET_PRODUCTS_BY_ID, { ids });

      const enrichedItems: WishlistItem[] = shopifyResponse.nodes.map((product) => ({
        id: product.id,
        name: product.title,
        price: parseFloat(product.priceRange?.minVariantPrice?.amount ?? '0'),
        imageUrl: product.featuredImage?.url ?? '',
        description: product.description ?? '',
        type: product.productType ?? '',
      }));

      return enrichedItems;
    } catch (err) {
      toast('Could not load wishlist', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);


// -------------------- Move wishlist item -> cart --------------------
export const moveToCartAsync = createAsyncThunk<string, string, { state: RootState; dispatch: AppDispatch; rejectValue: string }>(
  'wishlist/moveToCart',
  async (productId, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.user.user;
      const numericId = productId.includes('/') ? productId.split('/').pop()! : productId;

      if (!user) {
        // Guest: remove from guestWishlist localStorage and add to guestCart
        const raw = localStorage.getItem('guestWishlist');
        const guestWishlist: WishlistItem[] = raw ? JSON.parse(raw) : [];
        const item = guestWishlist.find((i) => {
          const iid = String(i.id);
          return iid === productId || iid.includes(productId) || iid.endsWith(`/${productId}`);
        });
        if (!item) return rejectWithValue('Item not found in wishlist');

        // remove from guest wishlist
        const filtered = guestWishlist.filter((i) => {
          const iid = String(i.id);
          return !(iid === productId || iid.includes(productId) || iid.endsWith(`/${productId}`));
        });
        try {
          localStorage.setItem('guestWishlist', JSON.stringify(filtered));
        } catch (e) {
          console.warn('Failed to update guestWishlist', e);
        }

        // prepare CartItem (quantity 1)
        const cartItem: CartItem = {
          id: numericId,
          name: item.name || '',
          price: item.price || 0,
          imageUrl: item.imageUrl || '',
          description: item.description || '',
          type: item.type || '',
          quantity: 1,
        };

        // Use existing addToGuestCart thunk to persist
        await dispatch(addToGuestCart(cartItem));
        toast('Moved to cart', { className: 'toast-info' });
        return numericId;
      }

      // Logged-in user -> backend move endpoint
      const encodedId = encodeURIComponent(numericId);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/move-to-cart/${encodedId}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to move to cart');

      await dispatch(getWishlistAsync());
      await dispatch(getCartAsync());
      toast('Moved to cart', { className: 'toast-info' });
      return numericId;
    } catch (err) {
      toast('Failed to move item to cart', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);

// -------------------- Remove wishlist item --------------------
export const removeFromWishlistAsync = createAsyncThunk<string, string, { state: RootState; dispatch: AppDispatch; rejectValue: string }>(
  'wishlist/removeFromWishlist',
  async (productId, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.user.user;
      const numericId = productId.includes('/') ? productId.split('/').pop()! : productId;

      if (!user) {
        // guest -> remove from localStorage
        const raw = localStorage.getItem('guestWishlist');
        const guestWishlist: WishlistItem[] = raw ? JSON.parse(raw) : [];
        const filtered = guestWishlist.filter((i) => {
          const iid = String(i.id);
          return !(iid === productId || iid.includes(productId) || iid.endsWith(`/${productId}`));
        });
        try {
          localStorage.setItem('guestWishlist', JSON.stringify(filtered));
        } catch (e) {
          console.warn('Failed to update guestWishlist', e);
        }
        toast('Removed from wishlist', { className: 'toast-warning' });
        return numericId;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/${numericId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to remove from wishlist');

      await dispatch(getWishlistAsync());
      await dispatch(getCartAsync());
      toast('Removed from wishlist', { className: 'toast-warning' });
      return numericId;
    } catch (err) {
      toast('Could not remove item', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);


// ---- removeFromGuestWishlist (localStorage) ----
export const removeFromGuestWishlist = createAsyncThunk<
  string, // returned payload: removed numeric id
  string, // arg: productId (either gid or numeric)
  { state: RootState }
>(
  'wishlist/removeFromGuestWishlist',
  async (productId) => {
    try {
      // normalize numeric id (handle both gid and plain numeric)
      const numericId = productId.includes('/') ? productId.split('/').pop()! : productId;

      const raw = localStorage.getItem('guestWishlist');
      const guestItems: WishlistItem[] = raw ? (JSON.parse(raw) as WishlistItem[]) : [];

      // remove any entry whose id matches the numeric or gid forms
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
        localStorage.setItem('guestWishlist', JSON.stringify(filtered));
      } catch (e) {
        console.warn('Failed to persist guestWishlist after removal', e);
      }

      toast('Removed from wishlist', { className: 'toast-warning' });
      return numericId;
    } catch (err) {
      console.error('removeFromGuestWishlist failed', err);
      throw err;
    }
  }
);
