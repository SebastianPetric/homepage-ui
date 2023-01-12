import { configureStore } from "@reduxjs/toolkit";
import Reducer from "../reducers/Reducers";

export const store = configureStore({
  reducer: Reducer,
});
