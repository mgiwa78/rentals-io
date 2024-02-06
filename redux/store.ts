import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";
import compareReducer from "./slice/compareSlice";
import productFiltersReducer from "./slice/productFilterSlice";
import rentalsReducer from "./slice/rentalsSlice";
import authReducer from "./slice/authSlice";
import quickViewReducer from "./slice/quickViewSlice";
import { api } from "../service/api";
import logger from "redux-logger";

export const makeStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      cart: cartReducer,
      auth: authReducer,
      wishlist: wishlistReducer,
      compare: compareReducer,
      productFilters: productFiltersReducer,
      rentals: rentalsReducer,
      quickView: quickViewReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, logger),
    ...options
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
