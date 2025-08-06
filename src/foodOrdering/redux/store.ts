import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import foodReducer from './foodSlice';
import orderReducer from './orderSlice';
export const store = configureStore({
    reducer: {
        food: foodReducer,
        cart: cartReducer,
        orders: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
