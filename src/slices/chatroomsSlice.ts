import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  chatrooms: IChatroom[];
  openedChatrooms: IChatroom[];
  chatroomWindows: IChatroom[];
}

const initialState: IInitialState = {
  chatrooms: [],
  openedChatrooms: [],
  chatroomWindows: [],
};

export const chatroomsSlice = createSlice({
  name: 'chatrooms',
  initialState,
  reducers: {
    getChatrooms(state, { payload: { chatrooms } }: PayloadAction<{ chatrooms: IChatroom[] }>) {
      state.chatrooms = chatrooms;
      // set state.openedChatrooms
      // by using localStorage openedChatrooms id to filter api response chatrooms data
      const localOpenedChatrooms = JSON.parse(localStorage.getItem('openedChatrooms') || '[]');
      state.openedChatrooms = chatrooms.filter(
        (chatroom) => localOpenedChatrooms.includes(chatroom.id),
      );
      // set state.chatroomWindows
      // by using localStorage chatroomWindows id to filter api response chatrooms data
      const localChatroomsWindows = JSON.parse(localStorage.getItem('chatroomWindows') || '[]');
      state.chatroomWindows = chatrooms.filter(
        (chatroom) => localChatroomsWindows.includes(chatroom.id),
      );
    },
    createChatroom(state, { payload }:PayloadAction<IChatroom>) {
      state.chatrooms.push(payload);
      console.log('this', this);

      state.openedChatrooms.push(payload);
      localStorage.setItem('openedChatrooms', JSON.stringify(state.openedChatrooms.map((chatroom) => chatroom.id)));
      // open chatroom window
      const isExist = state.chatroomWindows.some((chatroom) => chatroom.id === payload.id);
      if (!isExist) state.chatroomWindows.push(payload);
      localStorage.setItem('chatroomWindows', JSON.stringify(state.chatroomWindows.map((chatroom) => chatroom.id)));
    },
    openChatroom(state, { payload }: PayloadAction<IChatroom>) {
      // add to aside list
      state.openedChatrooms.push(payload);
      localStorage.setItem('openedChatrooms', JSON.stringify(state.openedChatrooms.map((chatroom) => chatroom.id)));
      // open chatroom window
      const isExist = state.chatroomWindows.some((chatroom) => chatroom.id === payload.id);
      if (!isExist) state.chatroomWindows.push(payload);
      localStorage.setItem('chatroomWindows', JSON.stringify(state.chatroomWindows.map((chatroom) => chatroom.id)));
    },
    removeChatroom(state, { payload }: PayloadAction<IChatroom>) {
      // remove chatroom from openedChatrooms list
      const index = state.openedChatrooms.findIndex((chatroom) => chatroom.id === payload.id);
      if (index !== -1) state.openedChatrooms.splice(index, 1);
      localStorage.setItem('openedChatrooms', JSON.stringify(state.openedChatrooms.map((chatroom) => chatroom.id)));

      // close chatroom window
      const windowIndex = state.chatroomWindows.findIndex((chatroom) => chatroom.id === payload.id);
      if (windowIndex !== -1) state.chatroomWindows.splice(windowIndex, 1);
      localStorage.setItem('chatroomWindows', JSON.stringify(state.chatroomWindows.map((chatroom) => chatroom.id)));
    },
    openChatroomWindow(state, { payload }: PayloadAction<IChatroom>) {
      const isExist = state.chatroomWindows.some((chatroom) => chatroom.id === payload.id);
      if (!isExist) state.chatroomWindows.push(payload);
      localStorage.setItem('chatroomWindows', JSON.stringify(state.chatroomWindows.map((chatroom) => chatroom.id)));
    },
    closeChatroomWindow(state, { payload }: PayloadAction<IChatroom>) {
      const index = state.chatroomWindows.findIndex((chatroom) => chatroom.id === payload.id);
      if (index !== -1) state.chatroomWindows.splice(index, 1);
      localStorage.setItem('chatroomWindows', JSON.stringify(state.chatroomWindows.map((chatroom) => chatroom.id)));
    },
    updateChat(state, { payload }: PayloadAction<ISocketChat>) {
      const index = state.chatrooms.findIndex((chatroom) => chatroom.id === payload.chatroom_id);
      if (!payload.content) return;
      state.chatrooms[index].chats?.push(payload);

      const windowIndex = state.chatroomWindows.findIndex(
        (chatroom) => chatroom.id === payload.chatroom_id,
      );
      if (windowIndex !== -1) state.chatroomWindows[windowIndex].chats?.push(payload);
    },
  },
});

export const {
  getChatrooms, openChatroom, removeChatroom, openChatroomWindow, closeChatroomWindow, updateChat,
  createChatroom,
} = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
