// client/app/(main)/lib/redux/wishlist/wishlistSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from './wishlistTypes';
import {
  getWishlistAsync,
  addToWishlistAsync,
  removeFromWishlistAsync,
  moveToCartAsync,
  addToGuestWishlist,
  loadGuestWishlistFromStorage,
  removeFromGuestWishlist,
  migrateGuestWishlistToServer,
} from './wishlistActions';

type WishlistState = {
  items: WishlistItem[];
  guestItems: WishlistItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: WishlistState = {
  items: [],
  guestItems: [],
  status: 'idle',
  error: null,
};

// Fully typed rejected handler
const handleRejected = (
  state: WishlistState,
  action: ReturnType<
    | typeof getWishlistAsync.rejected
    | typeof addToWishlistAsync.rejected
    | typeof removeFromWishlistAsync.rejected
    | typeof moveToCartAsync.rejected
    | typeof addToGuestWishlist.rejected
    | typeof loadGuestWishlistFromStorage.rejected
    | typeof removeFromGuestWishlist.rejected
    | typeof migrateGuestWishlistToServer.rejected
  >
) => {
  state.status = 'failed';

  // Safely convert payload or error message to string
  if (action.payload) {
    state.error = String(action.payload);
  } else if (action.error?.message) {
    state.error = action.error.message;
  } else {
    state.error = null;
  }
};


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    },
    clearGuestWishlist: (state) => {
      state.guestItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // GET WISHLIST
      .addCase(getWishlistAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWishlistAsync.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.items = action.payload || [];
        state.status = 'succeeded';
      })
      .addCase(getWishlistAsync.rejected, handleRejected)

      // ADD TO WISHLIST
      .addCase(addToWishlistAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addToWishlistAsync.rejected, handleRejected)

      // REMOVE FROM WISHLIST
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(removeFromWishlistAsync.rejected, handleRejected)

      // MOVE TO CART
      .addCase(moveToCartAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(moveToCartAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(moveToCartAsync.rejected, handleRejected)

      // GUEST: addToGuestWishlist
      .addCase(addToGuestWishlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addToGuestWishlist.fulfilled, (state, action: PayloadAction<WishlistItem>) => {
        state.guestItems.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addToGuestWishlist.rejected, handleRejected)

      // GUEST: loadGuestWishlistFromStorage
      .addCase(loadGuestWishlistFromStorage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadGuestWishlistFromStorage.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.guestItems = action.payload || [];
        state.status = 'succeeded';
      })
      .addCase(loadGuestWishlistFromStorage.rejected, (state, action) => {
        state.guestItems = [];
        handleRejected(state, action);
      })

      // GUEST: removeFromGuestWishlist
      .addCase(removeFromGuestWishlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeFromGuestWishlist.fulfilled, (state, action: PayloadAction<string>) => {
        state.guestItems = state.guestItems.filter((i) => i.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(removeFromGuestWishlist.rejected, handleRejected)

      // GUEST: migrateGuestWishlistToServer
      .addCase(migrateGuestWishlistToServer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(migrateGuestWishlistToServer.fulfilled, (state) => {
        state.guestItems = [];
        state.status = 'succeeded';
      })
      .addCase(migrateGuestWishlistToServer.rejected, handleRejected);
  },
});

export const { clearWishlist, clearGuestWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
