import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../user/UserSlice";
import authenticationSlice from "../authentication/AuthenticationSlice";

export default combineReducers({
  user: userSlice,
  authentication: authenticationSlice,
});
