import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { toast } from "react-toastify";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    image: string;
    type?: "animals" | "animals-with-categories";
    category_uuid?: string;
}
interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("cartItems") || "[]"), 
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity < existingItem.stock) {
                    existingItem.quantity += 1;
                } else {
                    toast.error("Not enough stock available");
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.items)); 
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity = Math.min(action.payload.quantity, item.stock);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items)); 
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cartItems");
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
