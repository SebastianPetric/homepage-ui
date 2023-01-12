import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/Reducers";

export const store = configureStore({
  reducer: userReducer,
});
