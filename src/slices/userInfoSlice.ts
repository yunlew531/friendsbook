import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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
      state.profile.banner_url = payload;
    },
    postAvatarImg(state, { payload }: PayloadAction<string>) {
      state.profile.avatar_url = payload;
    },
    logout(state) {
      Cookies.set('Friendsbook', '');
      state.isLogin = false;
      state.profile = {};
    },
    updateProfile(state, { payload }: PayloadAction<IProfile>) {
      const keys = Object.keys(payload);
      keys.forEach((key) => {
        // @ts-ignore
        state.profile[key as keyof IProfile] = payload[key as keyof IProfile];
      });
    },
  },
});

export const {
  getProfile, postBannerImg, postAvatarImg, logout, updateProfile,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
