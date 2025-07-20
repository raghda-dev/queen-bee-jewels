//client/app/(main)/lib/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import wishlistReducer from './wishlist/wishlistSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // ✅ Enables DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // ✅ Capital A
