import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../user/UserSlice";
import descriptionTextSlice from "../covering-letter/DescriptionTextSlice";
import experienceSlice from "../experiences/ExperienceSlice";
import academicSlice from "../academic/AcademicSlice";
import careerSlice from "../career/CareerSlice";

export default combineReducers({
  user: userSlice,
  description: descriptionTextSlice,
  experiences: experienceSlice,
  career: careerSlice,
  academic: academicSlice,
});
