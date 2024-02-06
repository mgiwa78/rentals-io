// quickViewSlice.ts
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { createSlice } from "@reduxjs/toolkit";

interface QuickView {
  product: string;
  open: string;
}

const initialState: QuickView | null = null;

const quickViewSlice = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    openQuickView(state, action) {
      return {
        ...action.payload.product
      };
    },
    closeQuickView() {
      return;
    }
  }
});

const selectQuickViewSlice = (state: RootState) => state.quickView;

export const selectQuickViewState = createSelector(
  selectQuickViewSlice,
  (quickView) => quickView
);

export const { openQuickView, closeQuickView } = quickViewSlice.actions;

export default quickViewSlice.reducer;
