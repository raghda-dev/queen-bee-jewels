// client/app/(main)/lib/redux/store.ts


import { configureStore, combineReducers } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/sidebarSlice';
import cartReducer from './cart/cartSlice';
import wishlistReducer from './wishlist/wishlistSlice';
import userReducer from './user/userSlice';
import chatReducer from './chat/chatSlice';

// ✅ Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  user: userReducer,
  chat: chatReducer,
  sidebar: sidebarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// ✅ Factory to create store (with optional preloaded state for SSR/hydration)
export const createAppStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore['dispatch'];
