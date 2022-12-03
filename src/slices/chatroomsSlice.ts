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
      state.chatrooms = chatrooms.map((chatroom) => ({ ...chatroom, fold: true }));
      // set state.openedChatrooms
      // by using localStorage openedChatrooms id to filter api response chatrooms data
      const localOpenedChatrooms = JSON.parse(localStorage.getItem('openedChatrooms') || '[]');
      state.openedChatrooms = state.chatrooms.filter(
        (chatroom) => localOpenedChatrooms.includes(chatroom.id),
      );
      // set state.chatroomWindows
      // by using localStorage chatroomWindows id to filter api response chatrooms data
      const localChatroomsWindows = JSON.parse(localStorage.getItem('chatroomWindows') || '[]');
      state.chatroomWindows = state.chatrooms.filter(
        (chatroom) => localChatroomsWindows.includes(chatroom.id),
      );
    },
    createChatroom(state, { payload }: PayloadAction<IChatroom>) {
      state.chatrooms.push(payload);
      state.openedChatrooms.push(payload);
      localStorage.setItem('openedChatrooms', JSON.stringify(state.openedChatrooms.map((chatroom) => chatroom.id)));
      // open chatroom window
      state.chatroomWindows.push({ ...payload, fold: false });
      localStorage.setItem('chatroomWindows', JSON.stringify(state.chatroomWindows.map((chatroom) => chatroom.id)));
    },
    openChatroom(state, { payload }: PayloadAction<IChatroom>) {
      // add to aside list
      state.openedChatrooms.push(payload);
      localStorage.setItem('openedChatrooms', JSON.stringify(state.openedChatrooms.map((chatroom) => chatroom.id)));
      // open chatroom window
      const index = state.chatroomWindows.findIndex((chatroom) => chatroom.id === payload.id);
      if (index > -1) state.chatroomWindows[index].fold = false;
      else state.chatroomWindows.push({ ...payload, fold: false });
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
      const index = state.chatroomWindows.findIndex((chatroom) => chatroom.id === payload.id);
      if (index > -1) state.chatroomWindows[index].fold = false;
      else state.chatroomWindows.push({ ...payload, fold: false });
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

      const openedChatroomIndex = state.openedChatrooms.findIndex(
        (chatroom) => chatroom.id === payload.chatroom_id,
      );

      const windowIndex = state.chatroomWindows.findIndex(
        (chatroom) => chatroom.id === payload.chatroom_id,
      );

      if (openedChatroomIndex > -1) {
        if (windowIndex > -1) {
          state.chatroomWindows[windowIndex].chats?.push(payload);
          state.chatroomWindows[windowIndex].fold = false;
        } else state.chatroomWindows.push({ ...state.chatrooms[index], fold: false });
      } else {
        state.openedChatrooms.push(state.chatrooms[index]);
        localStorage.setItem('openedChatrooms', JSON.stringify(state.openedChatrooms.map((chatroom) => chatroom.id)));
        state.chatroomWindows.push({ ...state.chatrooms[index], fold: false });
      }
    },
    foldChatroomWindow(
      state,
      { payload }: PayloadAction<{ chatroomId: string, status: boolean }>,
    ) {
      const index = state.chatroomWindows.findIndex(
        (chatroom) => chatroom.id === payload.chatroomId,
      );
      state.chatroomWindows[index].fold = payload.status;
    },
  },
});

export const {
  getChatrooms, openChatroom, removeChatroom, openChatroomWindow, closeChatroomWindow, updateChat,
  createChatroom, foldChatroomWindow,
} = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
