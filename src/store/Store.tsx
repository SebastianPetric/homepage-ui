import { configureStore } from "@reduxjs/toolkit";
import Reducer from "../reducers/Reducers";

export const store = configureStore({
  reducer: Reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
