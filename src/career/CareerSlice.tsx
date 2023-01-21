import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  deleteEntity,
  ENDPOINT,
  findAllEntities,
  saveEntity,
  updateEntity,
} from "../shared/RestCaller";

type TCareerState = {
  careerSteps: TCareer[];
};

export type TCareer = {
  id: string;
  title: string;
  company: string;
  from_date: string;
  to_date: string | undefined;
  toDos: string[];
};

export type TCareerBody = {
  title: string;
  company: string;
  from_date: string;
  to_date: string | undefined;
  toDos: string[];
};

export const getAllCareerSteps = createAsyncThunk("career/getAll", async () => {
  return await findAllEntities(ENDPOINT.CAREER);
});

export const deleteCareerStep = createAsyncThunk(
  "career/delete",
  async (cur: TCareer) => {
    await deleteEntity(ENDPOINT.CAREER, cur.id);
    return cur;
  }
);

export const saveCareerStep = createAsyncThunk(
  "career/save",
  async (cur: TCareerBody) => {
    return await saveEntity(ENDPOINT.CAREER, JSON.stringify(cur));
  }
);

export const updateCareerStep = createAsyncThunk(
  "career/update",
  async (cur: TCareer) => {
    return await updateEntity(ENDPOINT.CAREER, cur.id, JSON.stringify(cur));
  }
);

const careerSlice = createSlice({
  name: "career",
  initialState: { careerSteps: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllCareerSteps.fulfilled,
      (state: TCareerState, action: PayloadAction<TCareer[]>) => {
        state.careerSteps = action.payload.sort(
          (a: TCareer, b: TCareer) =>
            Date.parse(b.from_date) - Date.parse(a.from_date)
        );
      }
    );
    builder.addCase(
      deleteCareerStep.fulfilled,
      (state: TCareerState, action: PayloadAction<TCareer>) => {
        state.careerSteps = [
          ...state.careerSteps.filter((it) => it.id !== action.payload.id),
        ];
      }
    );
    builder.addCase(
      saveCareerStep.fulfilled,
      (state: TCareerState, action: PayloadAction<TCareer>) => {
        state.careerSteps = [...state.careerSteps, action.payload];
      }
    );
    builder.addCase(
      updateCareerStep.fulfilled,
      (state: TCareerState, action: PayloadAction<TCareer>) => {
        state.careerSteps = [
          ...state.careerSteps
            .map((it) => {
              if (it.id === action.payload.id) {
                it.title = action.payload.title;
                it.company = action.payload.company;
                it.from_date = action.payload.from_date;
                it.to_date = action.payload.to_date;
                it.toDos = action.payload.toDos;
              }
              return it;
            })
            .sort(
              (a: TCareer, b: TCareer) =>
                Date.parse(b.from_date) - Date.parse(a.from_date)
            ),
        ];
      }
    );
  },
});

export default careerSlice.reducer;
