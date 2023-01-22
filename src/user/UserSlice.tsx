import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ENDPOINT, findAllEntities, updateEntity } from "../shared/RestCaller";
import { TKeyValue } from "../experiences/ExperienceSlice";

export type TUserState = {
  info: TUserInfo;
};

export type TUserInfo = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  github_link: string;
  linkedin_link: string;
  xing_link: string;
};

export const getUserInfo = createAsyncThunk("user/getInfo", async () => {
  const response: TUserInfo[] = await findAllEntities(ENDPOINT.USERS);
  return response[0];
});

export const editUserInfo = createAsyncThunk(
  "user/editInfo",
  async (edited: TUserInfo) => {
    return await updateEntity(
      ENDPOINT.USERS,
      edited.id,
      JSON.stringify(edited)
    );
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: {
      id: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      github_link: "",
      linkedin_link: "",
      xing_link: "",
    },
  },
  reducers: {
    update: (state: TUserState, action: PayloadAction<TKeyValue>) => {
      return {
        ...state,
        info: { ...state.info, [action.payload.key!]: action.payload.value },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserInfo.fulfilled,
      (state: TUserState, action: PayloadAction<TUserInfo>) => {
        state.info = action.payload;
      }
    );
    builder.addCase(
      editUserInfo.fulfilled,
      (state: TUserState, action: PayloadAction<TUserInfo>) => {
        state.info = action.payload;
      }
    );
  },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
