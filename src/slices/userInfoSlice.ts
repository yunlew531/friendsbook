import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUserInfoState {
  uid: string;
}

const initialState: IUserInfoState = {
  uid: 'uid test',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUid(state, { payload }: PayloadAction<string>) {
      state.uid = payload;
    },
  },
});

export const { updateUid } = userInfoSlice.actions;

export default userInfoSlice.reducer;
