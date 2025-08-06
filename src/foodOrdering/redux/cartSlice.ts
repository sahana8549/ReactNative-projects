import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FoodItem } from './foodSlice';

interface CartItem extends FoodItem { quantity: number; }

interface CartState { items: CartItem[]; }

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] } as CartState,
    reducers: {
        addItem: (state, action: PayloadAction<FoodItem>) => {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) existing.quantity += 1;
            else state.items.push({ ...action.payload, quantity: 1 });
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const found = state.items.find(i => i.id === action.payload);
            if (found) {
                if (found.quantity > 1) found.quantity -= 1;
                else state.items = state.items.filter(i => i.id !== action.payload);
            }
        },
        clearCart: (state) => { state.items = []; }
    }
});

export const { addItem, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
