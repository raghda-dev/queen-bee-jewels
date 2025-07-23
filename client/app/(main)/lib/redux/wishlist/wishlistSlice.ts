// client/app/(main)/lib/redux/wishlist/wishlistSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { WishlistItem } from '../wishlist/wishlistTypes';
import {
  getWishlistAsync,
  addToWishlistAsync,
  removeFromWishlistAsync,
  moveToCartAsync,
} from './wishlistActions';

type WishlistState = {
  items: WishlistItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: WishlistState = {
  items: [],
  status: 'idle',
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWishlistAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getWishlistAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(moveToCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(moveToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
