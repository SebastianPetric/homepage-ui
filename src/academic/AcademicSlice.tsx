import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteEntity,
  ENDPOINT,
  findAllEntities,
  saveEntity,
  updateEntity,
} from "../shared/RestCaller";

type TAcademicState = {
  academicSteps: TAcademic[];
};

export type TAcademic = {
  id: string;
  title: string;

  school: string;

  from_date: string;

  to_date: string;

  focusList: string[];
};

export type TAcademicBody = {
  title: string;

  school: string;

  from_date: string;

  to_date: string | undefined;

  focusList: string[];
};

export const getAllAcademicSteps = createAsyncThunk(
  "academic/getAll",
  async () => {
    return await findAllEntities(ENDPOINT.ACADEMIC);
  }
);

export const updateAcademicStep = createAsyncThunk(
  "academic/update",
  async (cur: TAcademic) => {
    return await updateEntity(
      ENDPOINT.ACADEMIC,
      cur.id,
      JSON.stringify({ ...cur } as TAcademicBody)
    );
  }
);

export const saveAcademicStep = createAsyncThunk(
  "academic/save",
  async (cur: TAcademicBody) => {
    return await saveEntity(ENDPOINT.ACADEMIC, JSON.stringify(cur));
  }
);

export const deleteAcademicStep = createAsyncThunk(
  "academic/delete",
  async (cur: TAcademic) => {
    await deleteEntity(ENDPOINT.ACADEMIC, cur.id);
    return cur;
  }
);

const academicSlice = createSlice({
  name: "academic",
  initialState: { academicSteps: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllAcademicSteps.fulfilled,
      (state: TAcademicState, action: PayloadAction<TAcademic[]>) => {
        state.academicSteps = action.payload.sort(
          (a: TAcademic, b: TAcademic) =>
            Date.parse(b.from_date) - Date.parse(a.from_date)
        );
      }
    );
    builder.addCase(
      updateAcademicStep.fulfilled,
      (state: TAcademicState, action: PayloadAction<TAcademic>) => {
        state.academicSteps = state.academicSteps.map((it) => {
          if (it.id === action.payload.id) return action.payload;
          return it;
        });
      }
    );

    builder.addCase(
      saveAcademicStep.fulfilled,
      (state: TAcademicState, action: PayloadAction<TAcademic>) => {
        state.academicSteps = [...state.academicSteps, action.payload];
      }
    );

    builder.addCase(
      deleteAcademicStep.fulfilled,
      (state: TAcademicState, action: PayloadAction<TAcademic>) => {
        state.academicSteps = [
          ...state.academicSteps.filter((it) => it.id !== action.payload.id),
        ];
      }
    );
  },
});

export default academicSlice.reducer;
