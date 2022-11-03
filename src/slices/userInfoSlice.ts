import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUserInfoState {
  uid: string;
  isLogin: boolean;
}

const initialState: IUserInfoState = {
  uid: '',
  isLogin: false,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<Pick<IUserInfoState, 'uid' | 'isLogin'>>) {
      state.uid = payload.uid;
      state.isLogin = payload.isLogin;
    },
  },
});

export const { login } = userInfoSlice.actions;

export default userInfoSlice.reducer;
