
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';



export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;