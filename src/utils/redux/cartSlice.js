// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // Each item: { id, name, price, quantity, imageId }
        restaurantId: null,
        restaurant:{},
    },
    reducers: {
        //action
        addItem: (state, action) => {  //reducer function - It's takes 2 parameter state and action .It modifies the state based on action
            const item = action.payload;

            if (state.items.length > 0 && state.restaurantId !== item.restaurantId) {
                toast.error("You can only add items from one restaurant. Please clear the cart first.");
                return;
            }
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({ ...item, quantity: 1 })
            }
            if (state.items.length === 1) {
                state.restaurantId = item.restaurantId;
                state.restaurant = item.restaurant;
            }
            // const existingItem = state.items.find(
            //     (item) => item.id === action.payload.id
            // );
            // if (existingItem) {
            //     existingItem.quantity += 1;
            // } else {
            //     state.items.push({ ...action.payload, quantity: 1 });
            // }
        },
        removeItem: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload.id
                    );
                }
            }
        },
        clearItem: (state) => {
            state.items.length = 0;
            state.restaurantId = null;
            state.restaurant=null;
        },
    },
});

export const { addItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;
