// AuthSlice.ts
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { createSlice } from "@reduxjs/toolkit";

interface Auth {
  token: string;
}

const initialState: Auth | null = { token: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});

const selectAuthSlice = (state: RootState) => state.auth;

export const selectAuthState = createSelector(selectAuthSlice, (Auth) => Auth);

export default authSlice.reducer;
