import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../user/UserSlice";
import authenticationSlice from "../authentication/AuthenticationSlice";
import descriptionTextSlice from "../covering-letter/DescriptionTextSlice";

export default combineReducers({
  user: userSlice,
  authentication: authenticationSlice,
  description: descriptionTextSlice,
});
