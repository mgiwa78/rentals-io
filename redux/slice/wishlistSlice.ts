// wishlistSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, findProductIndexById } from "@utils/util";
import storage from "@utils/localStorage";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Product {
  id: string;
  // Add other properties as needed
}

interface WishlistState {
  modal: boolean;
  items: Product[];
}

const initialState: WishlistState = {
  modal: false,
  items: []
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    openWishlist(state) {
      state.modal = true;
    },
    closeWishlist(state) {
      state.modal = false;
    },
    initLocalStorage(state, action) {
      state.items = action.payload.wishlist;
    },
    addToWishlist(state, action) {
      const index = findProductIndexById(
        state.items,
        action.payload.product.id
      );
      if (index === -1) {
        state.items.push(action.payload.product);
        storage.set("dokani_wishlist", state.items);
      }
    },
    deleteFromWishlist(state, action) {
      const updatedList = deleteProduct(state.items, action.payload.productId);
      state.items = updatedList;
      storage.set("dokani_wishlist", updatedList);
    },
    clearWishlist(state) {
      state.items = [];
      storage.set("dokani_wishlist", []);
    }
  }
});

const selectWishlistSlice = (state: RootState) => state.wishlist;

// Selector to get the modal state
export const selectModalState = createSelector(
  selectWishlistSlice,
  (wishlist) => wishlist.modal
);

// Selector to get the wishlist items
export const selectWishlistItems = createSelector(
  selectWishlistSlice,
  (wishlist) => wishlist.items
);

export const {
  openWishlist,
  closeWishlist,
  initLocalStorage,
  addToWishlist,
  deleteFromWishlist,
  clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
