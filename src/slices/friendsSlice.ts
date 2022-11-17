import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  friends: IFriend[];
}

const initialState: IInitialState = {
  friends: [],
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    getFriends(state, { payload }: PayloadAction<IFriend[]>) {
      state.friends = payload;
    },
  },
});

export const { getFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
