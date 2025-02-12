import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "./store";

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
}

interface WishlistState {
    items: WishlistItem[];
}

const loadWishlistFromStorage = (): WishlistState => {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : { items: [] };
};

const saveWishlistToStorage = (wishlist: WishlistState) => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const initialState: WishlistState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
            if (!state.items.some((item) => item.id === action.payload.id)) {
                state.items.push(action.payload);
                saveWishlistToStorage(state);
            }
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            saveWishlistToStorage(state);
        },
        moveToCart: (state, action: PayloadAction<{ item: WishlistItem; stock: number }>) => {
            const { item, stock } = action.payload;
            if (stock > 0) {
                state.items = state.items.filter((i) => i.id !== item.id);
                saveWishlistToStorage(state);
            } else {
                toast.error("Out of stock");
            }
        },
    },
});

export const { addToWishlist, removeFromWishlist, moveToCart } = wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.wishlist;
export default wishlistSlice.reducer;
