import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProductFiltersState {
  category: string;
  rating: number;
  // Add other properties as needed
}

const initialState: ProductFiltersState = {
  category: "",
  rating: 0
  // Initialize other properties here
};

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    updateProductFilters(
      state,
      action: PayloadAction<Partial<ProductFiltersState>>
    ) {
      return {
        ...state,
        ...action.payload
      };
    },
    updateProductCategory(state, action: PayloadAction<{ category: string }>) {
      state.category = action.payload.category;
    },
    updateProductRating(state, action: PayloadAction<{ rating: number }>) {
      state.rating = action.payload.rating;
    }
  }
});

const selectProductFiltersSlice = (state: RootState) => state.productFilters;

export const selectCategoryFilter = createSelector(
  selectProductFiltersSlice,
  (productFilters) => productFilters.category
);

export const {
  updateProductFilters,
  updateProductCategory,
  updateProductRating
} = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
