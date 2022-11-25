import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  friends: IFriends;
}

const initialState: IInitialState = {
  friends: {
    connected: [],
    received: [],
    sent: [],
  },
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    getFriends(state, { payload }: PayloadAction<IFriends>) {
      state.friends = payload;
    },
  },
});

export const { getFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
