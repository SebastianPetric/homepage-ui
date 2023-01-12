import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TAuthenticationState = {
  isAuthenticated: boolean;
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: { isAuthenticated: false },
  reducers: {
    setIsLoggedIn: (
      state: TAuthenticationState,
      action: PayloadAction<boolean>
    ) => {
      return { ...state, isAuthenticated: action.payload };
    },
  },
});

export const { setIsLoggedIn } = authenticationSlice.actions;

export default authenticationSlice.reducer;
