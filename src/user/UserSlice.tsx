import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TUserInfo, TUserInfoDTO } from "./InfoTab";
import { ENDPOINT } from "../App";
import { findAllEntities, updateEntity } from "../shared/RestCaller";
import { TKeyValue } from "../shared/modals/CreateAndEditAcademicCareerStepModal";

export type TUserState = {
  info: TUserInfo;
};

const initialUserState: TUserInfo = {
  id: "id",
  first_name: "string",
  last_name: "string",
  phone: "string",
  email: "string",
  github_link: "string",
  linkedin_link: "string",
  xing_link: "string",
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
      JSON.stringify({ ...edited } as TUserInfoDTO)
    );
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { info: { ...initialUserState } },
  reducers: {
    update: (state: TUserState, action: PayloadAction<TKeyValue>) => {
      return {
        ...state,
        info: { ...state.info, [action.payload.key]: action.payload.value },
        isLoading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserInfo.fulfilled,
      (state: TUserState, action: PayloadAction<TUserInfo>) => {
        return { ...state, info: { ...action.payload } };
      }
    );
    builder.addCase(getUserInfo.rejected, (state: TUserState) => {});
    builder.addCase(
      editUserInfo.fulfilled,
      (state: TUserState, action: PayloadAction<TUserInfo>) => {
        return { ...state, info: { ...action.payload }, isLoading: false };
      }
    );
    builder.addCase(editUserInfo.rejected, (state: TUserState) => {});
  },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
