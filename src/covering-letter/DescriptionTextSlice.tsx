import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TextType,
  TText,
  TTextDTO,
} from "../shared/description/EditDescriptionTextModal";
import { findTextByType, updateEntity } from "../shared/RestCaller";
import { RootState } from "../store/Store";
import { ENDPOINT } from "../App";

type TDescriptionState = {
  descriptions: TText[];
};

export const getDescriptionByType = createAsyncThunk(
  "description/getByType",
  async (type: TextType) => {
    return await findTextByType(type);
  }
);

export const editDescriptionById = createAsyncThunk(
  "description/editById",
  async (cur: TText) => {
    let resp = await updateEntity(
      ENDPOINT.COVERING_LETTER,
      cur.id,
      JSON.stringify({ ...cur } as TTextDTO)
    );
    console.log(resp);
    return resp;
  }
);

const descriptionTextSlice = createSlice({
  name: "description",
  initialState: { descriptions: [{ id: "", text: "", type: "" }] },
  reducers: {
    update: (state: TDescriptionState, action: PayloadAction<TText>) => {
      state.descriptions.map((it) => {
        if (it.id === action.payload.id) it.text = action.payload.text;
      });
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getDescriptionByType.fulfilled,
      (state: TDescriptionState, action: PayloadAction<TText>) => {
        state.descriptions.push(action.payload);
      }
    );
    builder.addCase(
      editDescriptionById.fulfilled,
      (state: TDescriptionState, action: PayloadAction<TText>) => {
        state.descriptions.map((it) => {
          if (it.id === action.payload.id) {
            it.text = action.payload.text;
          }
        });
      }
    );
  },
});

export const getStateByType = (state: RootState, type: TextType) => {
  const descr = state.description.descriptions.find(
    (it: TText) => it.type === type
  );
  return descr ? descr : { id: "", text: "", type: "" };
};

export const { update } = descriptionTextSlice.actions;
export default descriptionTextSlice.reducer;
