//client/app/(main)/lib/redux/cart/cartSlice.ts


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartTypes';
import {
  addToCartAsync,
  getCartAsync,
  removeFromCartAsync,
  moveToWishlistAsync,
  addToGuestCart,
  loadGuestCartFromStorage,
  migrateGuestCartToServer,
  removeFromGuestCart,
} from './cartActions';

/**
 * Safe helper to read guest cart from localStorage only on the client.
 * Wrapped in a function to avoid SSR access during module initialization.
 */
const getGuestCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem('guestCart');
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

type CartState = {
  items: CartItem[];
  guestItems: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CartState = {
  items: [],
  guestItems: typeof window !== 'undefined' ? getGuestCartFromStorage() : [],
  status: 'idle',
  error: null,
};

/** Persist guest cart snapshot to localStorage (swallow errors) */
const syncGuestCart = (guestItems: CartItem[]) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('guestCart', JSON.stringify(guestItems));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to sync guest cart to localStorage', e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    // Guest reducers
    clearGuestItems: (state) => {
      state.guestItems = [];
      syncGuestCart([]);
    },
    incrementGuestQuantity: (state, action: PayloadAction<string>) => {
      const item = state.guestItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        syncGuestCart(state.guestItems);
      }
    },
    decrementGuestQuantity: (state, action: PayloadAction<string>) => {
      const item = state.guestItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        syncGuestCart(state.guestItems);
      }
    },
    // local-only reducer for removing from guest cart
    removeFromGuestCartLocal: (state, action: PayloadAction<string>) => {
      state.guestItems = state.guestItems.filter((i) => i.id !== action.payload);
      syncGuestCart(state.guestItems);
    },
  },
  extraReducers: (builder) => {
    builder
      // addToCartAsync (server flow) - NOTE: thunk now refreshes the cart via getCartAsync,
      // so we DO NOT mutate state.items here using the (potentially undefined) payload.
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state) => {
        // Do not push a local payload here. getCartAsync will set canonical items.
        state.status = 'succeeded';
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        // prefer payload (rejectWithValue) if present
        state.error = (action.payload as string) || action.error?.message || null;
      })

      // getCartAsync (server -> canonical cart items)
      .addCase(getCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartAsync.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = 'succeeded';
        // Replace the whole cart with canonical server data
        state.items = action.payload || [];
      })
      .addCase(getCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error?.message || null;
      })

      // removeFromCartAsync
      .addCase(removeFromCartAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error?.message || null;
      })

      // moveToWishlistAsync (server)
      .addCase(moveToWishlistAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      })
      .addCase(moveToWishlistAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error?.message || null;
      })

      // addToGuestCart (localStorage-backed)
      .addCase(addToGuestCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.guestItems.push(action.payload);
        syncGuestCart(state.guestItems);
        state.status = 'succeeded';
      })
      .addCase(addToGuestCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToGuestCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error?.message || null;
      })

      // loadGuestCartFromStorage (hydrate guest cart into redux)
      .addCase(loadGuestCartFromStorage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadGuestCartFromStorage.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.guestItems = action.payload || [];
        syncGuestCart(state.guestItems);
        state.status = 'succeeded';
      })
      .addCase(loadGuestCartFromStorage.rejected, (state) => {
        state.guestItems = [];
        syncGuestCart([]);
        state.status = 'failed';
      })

      // removeFromGuestCart thunk result -> payload is numeric id
      .addCase(removeFromGuestCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromGuestCart.fulfilled, (state, action: PayloadAction<string>) => {
        const removedNumeric = action.payload;
        state.guestItems = state.guestItems.filter((i) => {
          const iid = String(i.id ?? '');
          return !(iid === removedNumeric || iid.includes(removedNumeric) || iid.endsWith(`/${removedNumeric}`));
        });
        syncGuestCart(state.guestItems);
        state.status = 'succeeded';
      })
      .addCase(removeFromGuestCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error?.message || null;
      })

      // migrateGuestCartToServer
      .addCase(migrateGuestCartToServer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(migrateGuestCartToServer.fulfilled, (state) => {
        state.status = 'succeeded';
        state.guestItems = [];
        syncGuestCart([]);
      })
      .addCase(migrateGuestCartToServer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error?.message || null;
      });
  },
});

export const {
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearGuestItems,
  incrementGuestQuantity,
  decrementGuestQuantity,
  removeFromGuestCartLocal,
} = cartSlice.actions;

export default cartSlice.reducer;
