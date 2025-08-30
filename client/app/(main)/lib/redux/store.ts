//client/app/(main)/lib/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import wishlistReducer from './wishlist/wishlistSlice';
import userReducer from './user/userSlice';
import chatReducer from './chat/chatSlice';
import sidebarReducer from './sidebar/sidebarSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    chat: chatReducer,
    sidebar: sidebarReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

