import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../user/UserSlice";

export default combineReducers({
  user: userSlice,
});
