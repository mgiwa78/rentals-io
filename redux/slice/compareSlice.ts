// compareSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import storage from "@utils/localStorage";
import { deleteProduct, findProductIndexById } from "@utils/util";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CompareState {
  modal: boolean;
  items: any[]; // Change this to the appropriate type for items
}

const initialState: CompareState = {
  modal: false,
  items: []
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    openCompare(state) {
      state.modal = true;
    },
    closeCompare(state) {
      state.modal = false;
    },
    initLocalStorage(state, action) {
      state.items = action.payload.compare;
    },
    addToCompare(state, action) {
      const index = findProductIndexById(
        state.items,
        action.payload.product.id
      );
      if (index === -1) {
        state.items.push(action.payload.product);
        storage.set("dokani_compare", state.items);
      }
    },
    deleteFromCompare(state, action) {
      const updatedList = deleteProduct(state.items, action.payload.productId);
      state.items = updatedList;
      storage.set("dokani_compare", updatedList);
    },
    clearCompare(state) {
      state.items = [];
      storage.set("dokani_compare", []);
    }
  }
});
// compareSlice.ts (continued)

// Select the compare slice from the root state
const selectCompareSlice = (state: RootState) => state.compare;

// Selector to get the modal state
export const selectModalState = createSelector(
  selectCompareSlice,
  (compare) => compare.modal
);

// Selector to get the compare items
export const selectCompareItems = createSelector(
  selectCompareSlice,
  (compare) => compare.items
);

export const {
  openCompare,
  closeCompare,
  initLocalStorage,
  addToCompare,
  deleteFromCompare,
  clearCompare
} = compareSlice.actions;

export default compareSlice.reducer;
