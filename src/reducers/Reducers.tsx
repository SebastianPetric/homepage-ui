import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../user/UserSlice";
import authenticationSlice from "../authentication/AuthenticationSlice";
import descriptionTextSlice from "../covering-letter/DescriptionTextSlice";
import experienceSlice from "../experiences/ExperienceSlice";
import academicSlice from "../academic/AcademicSlice";

export default combineReducers({
  user: userSlice,
  authentication: authenticationSlice,
  description: descriptionTextSlice,
  experiences: experienceSlice,
  academic: academicSlice,
});
