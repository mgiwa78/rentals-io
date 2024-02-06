// cartSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "@utils/localStorage";
import { deleteProduct, findProductIndexById } from "@utils/util";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Assuming you have a RootState type defined in your store

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  modal: boolean;
};

interface CartSlice {
  items: Array<CartItem>;
}

const initialState: CartSlice = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initLocalStorage(state, action: PayloadAction<{ cart: CartSlice }>) {
      return action.payload.cart;
    },
    addToCart(state, action: PayloadAction<{ product: CartItem }>) {
      const { product } = action.payload;
      const index = findProductIndexById(state.items, product.id);

      if (index !== -1) {
        state.items[index].quantity += 1;
      } else {
        if (!product.quantity) {
          product.quantity = 1;
        }
        state.items.push(product);
      }
      storage.set("dokani_cart", state);
    },
    deleteFromCart(state, action: PayloadAction<{ productId: string }>) {
      const { productId } = action.payload;
      const newCartItems = deleteProduct(state, productId);
      storage.set("dokani_cart", newCartItems);
      return newCartItems;
    },
    increaseQuantity(state, action: PayloadAction<{ productId: string }>) {
      const { productId } = action.payload;
      const index = findProductIndexById(state, productId);
      if (index !== -1) {
        state.items[index].quantity += 1;
        storage.set("dokani_cart", state);
      }
    },
    decreaseQuantity(state, action: PayloadAction<{ productId: string }>) {
      const { productId } = action.payload;
      const index = findProductIndexById(state, productId);
      if (index !== -1 && state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
        storage.set("dokani_cart", state);
      }
    },
    clearCart(state) {
      storage.set("dokani_cart", []);
      state.items = [];
    }
  }
});
// cartSlice.ts (continued)

const selectCartSlice = (state: RootState) => state.cart;

// export const selectModalState = createSelector(
//   selectCartSlice,
//   (cart) => cart.modal
// );

export const selectCartItems = createSelector(
  selectCartSlice,
  (cart) => cart.items
);

export const {
  initLocalStorage,
  addToCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
