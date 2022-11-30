import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  chatrooms: IChatroom[];
}

const initialState: IInitialState = {
  chatrooms: [],
};

export const chatroomsSlice = createSlice({
  name: 'chatrooms',
  initialState,
  reducers: {
    getChatrooms(state, { payload: { chatrooms } }: PayloadAction<{ chatrooms: IChatroom[] }>) {
      state.chatrooms = chatrooms;
    },
  },
});

export const { getChatrooms } = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
