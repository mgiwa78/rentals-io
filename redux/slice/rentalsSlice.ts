import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Rental {
  id: string;
  // Add other properties as needed
}
interface Category {
  id: string;
  // Add other properties as needed
}

interface RentalsState {
  items: Rental[];
  categories: Category[];
}

const initialState: RentalsState = {
  items: [],
  categories: []
};

const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    setRentalsAction(state, action) {
      state.items = action.payload;
    },
    setCategoriesAction(state, action) {
      state.categories = action.payload;
    },
    fetchedMoreRental(state, action) {
      const mergeAllRentals = [...state.items, ...action.payload.rentals];
      const limit =
        action.payload.total && mergeAllRentals.length > action.payload.total
          ? mergeAllRentals.splice(0, action.payload.total)
          : mergeAllRentals;
      state.items = limit;
    },
    addRental(state, action) {
      state.items.push(action.payload);
    },
    deleteRental(state, action) {
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    updateRental(state, action) {
      const index = state.items.findIndex(
        (product) => product.id === action.payload.product.id
      );
      if (index !== -1) {
        state.items[index] = action.payload.product;
      }
    }
  }
});
// rentalsSlice.ts (continued)

const selectRentalsSlice = (state: RootState) => state.rentals;

export const selectRentalsItems = createSelector(
  selectRentalsSlice,
  (rentals) => rentals.items
);

export const {
  setRentalsAction,
  fetchedMoreRental,
  addRental,
  deleteRental,
  updateRental
} = rentalsSlice.actions;

export default rentalsSlice.reducer;
