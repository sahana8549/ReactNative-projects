// src/foodOrdering/redux/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    id: string;
    date: string;
    items: any[];
    total: number;
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload); // latest first
        },
        clearOrders: (state) => {
            state.orders = [];
        },
    },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
