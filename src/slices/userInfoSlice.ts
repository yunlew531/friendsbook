import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUserInfoState {
  isLogin: boolean;
  profile: IProfile;
}

const initialState: IUserInfoState = {
  profile: {},
  isLogin: false,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getProfile(state, { payload }: PayloadAction<IProfile>) {
      state.profile = {
        ...payload,
      };
      state.isLogin = true;
    },
  },
});

export const { getProfile } = userInfoSlice.actions;

export default userInfoSlice.reducer;
