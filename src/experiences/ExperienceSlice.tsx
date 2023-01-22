import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteEntity,
  ENDPOINT,
  findAllEntities,
  saveEntity,
  updateEntity,
} from "../shared/RestCaller";

type TExperienceState = {
  experiences: TExperience[];
};

export enum EXPERIENCE_GRADE {
  TOTAL_BEGINNER = "TOTAL_BEGINNER",
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  PROFESSIONAL = "PROFESSIONAL",
}

export type TExperiencePoint = {
  name: string;

  yearsOfExperience: number;

  gradeOfExperience: EXPERIENCE_GRADE;
};

export type TExperience = {
  id?: string;
  title: string;
  experiencePoints: TExperiencePoint[];
};

export type TExperienceBody = {
  title: string;
  experiencePoints: TExperiencePoint[];
};

export type TKeyValue = {
  key: string;
  value: string;
};

export type TIndexValue = {
  index: number;
  value: string;
};

export type TIndexExperienceGrade = {
  index: number;
  grade?: EXPERIENCE_GRADE;

  years?: number;
};

export const getAllExperiences = createAsyncThunk(
  "experiences/findAll",
  async () => {
    return await findAllEntities(ENDPOINT.EXPERIENCES);
  }
);

export const updateExperience = createAsyncThunk(
  "experiences/editById",
  async (cur: TExperience) => {
    return await updateEntity(
      ENDPOINT.EXPERIENCES,
      cur.id!,
      JSON.stringify({
        title: cur.title,
        experiencePoints: cur.experiencePoints,
      })
    );
  }
);

export const createExperience = createAsyncThunk(
  "experiences/create",
  async (cur: TExperienceBody) => {
    return await saveEntity(ENDPOINT.EXPERIENCES, JSON.stringify(cur));
  }
);

export const deleteExperience = createAsyncThunk(
  "experiences/deleteById",
  async (cur: TExperience) => {
    await deleteEntity(ENDPOINT.EXPERIENCES, cur.id!);
    return cur;
  }
);

const experienceSlice = createSlice({
  name: "experiences",
  initialState: {
    experiences: [],
  },
  reducers: {
    update: (state: TExperienceState, action: PayloadAction<TExperience>) => {
      state.experiences = state.experiences.map((it) => {
        if (it.id === action.payload.id) {
          it.title = action.payload.title;
          it.experiencePoints = action.payload.experiencePoints;
        }
        return it;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllExperiences.fulfilled,
      (state: TExperienceState, action: PayloadAction<TExperience[]>) => {
        state.experiences = action.payload;
      }
    );
    builder.addCase(
      updateExperience.fulfilled,
      (state: TExperienceState, action: PayloadAction<TExperience>) => {
        state.experiences = state.experiences.map((it: TExperience) => {
          if (it.id === action.payload.id) {
            it.title = action.payload.title;
            it.experiencePoints = action.payload.experiencePoints;
          }
          return it;
        });
      }
    );
    builder.addCase(
      deleteExperience.fulfilled,
      (state: TExperienceState, action: PayloadAction<TExperience>) => {
        state.experiences = state.experiences.filter(
          (it) => it.id !== action.payload.id
        );
      }
    );
    builder.addCase(
      createExperience.fulfilled,
      (state: TExperienceState, action: PayloadAction<TExperience>) => {
        let tmp = [...state.experiences];
        tmp.push(action.payload);
        state.experiences = tmp;
      }
    );
  },
});
export const { update } = experienceSlice.actions;
export default experienceSlice.reducer;
