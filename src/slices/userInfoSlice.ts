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
    postBannerImg(state, { payload }: PayloadAction<string>) {
      state.profile.banner_img = payload;
    },
  },
});

export const { getProfile, postBannerImg } = userInfoSlice.actions;

export default userInfoSlice.reducer;
