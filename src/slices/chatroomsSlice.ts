import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  chatrooms: IChatroom[];
}

const findChatroomIndex = (roomId: string, chatrooms: IChatroom[]) => chatrooms.findIndex(
  (chatroom) => chatroom.id === roomId,
);

const updateLocalChatrooms = (uid: string, chatrooms: IChatroom[]) => {
  const usersChatrooms: IUsersChatrooms = JSON.parse(localStorage.getItem('chatrooms') || '{}');
  usersChatrooms[uid] = {};

  chatrooms.forEach((chatroom) => {
    const {
      id, fold, inOpenList, openWindow,
    } = chatroom;
    usersChatrooms[uid][<string>id] = {
      fold,
      inOpenList,
      openWindow,
    };
  });

  localStorage.setItem('chatrooms', JSON.stringify(usersChatrooms));
};

const initialState: IInitialState = {
  chatrooms: [],
};

export const chatroomsSlice = createSlice({
  name: 'chatrooms',
  initialState,
  reducers: {
    getChatrooms(state, { payload: { chatrooms, uid } }: PayloadAction<IChatroomsPayload>) {
      const localChatrooms: ILocalChatrooms = JSON.parse(localStorage.getItem('chatrooms') || '{}')[uid] || {};

      state.chatrooms = chatrooms.map((chatroom) => {
        const localChatroom: LocalChatroom = localChatrooms[chatroom.id as keyof ILocalChatrooms];

        return {
          ...chatroom,
          fold: true,
          inOpenList: false,
          openWindow: false,
          moreList: false,
          ...localChatroom,
        };
      });
    },
    // use after restful api createChatroom success
    createChatroom(state, { payload: { chatroom, uid } }: PayloadAction<IChatroomPayload>) {
      state.chatrooms.push({
        ...chatroom,
        fold: false,
        inOpenList: true,
        openWindow: true,
      });
      updateLocalChatrooms(uid, state.chatrooms);
    },
    pushChatroom(state, { payload }: PayloadAction<{ chatroom: IChatroom }>) {
      state.chatrooms.push(payload.chatroom);
    },
    openChatroom(state, { payload }: PayloadAction<IChatroomPayload>) {
      const index = findChatroomIndex(payload.chatroom.id!, state.chatrooms);
      state.chatrooms[index].inOpenList = true;
      // open chatroom window
      chatroomsSlice.caseReducers.openChatroomWindow(
        state,
         <PayloadAction<IChatroomPayload>>{ payload },
      );
    },
    removeChatroom(state, { payload }: PayloadAction<IChatroomPayload>) {
      const index = findChatroomIndex(payload.chatroom.id!, state.chatrooms);
      state.chatrooms[index].inOpenList = false;
      state.chatrooms[index].openWindow = false;
      updateLocalChatrooms(payload.uid, state.chatrooms);
    },
    openChatroomWindow(state, { payload }: PayloadAction<IChatroomPayload>) {
      const index = findChatroomIndex(payload.chatroom.id!, state.chatrooms);
      state.chatrooms[index] = {
        ...payload.chatroom,
        fold: false,
        inOpenList: true,
        openWindow: true,
      };
      updateLocalChatrooms(payload.uid, state.chatrooms);
    },
    closeChatroomWindow(state, { payload }: PayloadAction<IChatroomPayload>) {
      const index = findChatroomIndex(payload.chatroom.id!, state.chatrooms);
      state.chatrooms[index] = {
        ...state.chatrooms[index],
        fold: true,
        inOpenList: true,
        openWindow: false,
      };
      updateLocalChatrooms(payload.uid, state.chatrooms);
    },
    displayMoreList(state, { payload }: PayloadAction<{ status: boolean, chatroom: IChatroom }>) {
      const index = findChatroomIndex(payload.chatroom.id!, state.chatrooms);
      state.chatrooms[index].moreList = payload.status;
    },
    updateChat(state, { payload }: PayloadAction<ISocketChatPayload & { uid: string }>) {
      const index = findChatroomIndex(payload.chat.chatroom_id!, state.chatrooms);

      state.chatrooms[index] = {
        ...state.chatrooms[index],
        chats: [...(state.chatrooms[index].chats || []), payload.chat],
        fold: false,
        inOpenList: true,
        openWindow: true,
      };
      updateLocalChatrooms(payload.uid!, state.chatrooms);
    },
    foldChatroomWindow(state, { payload }: PayloadAction<IChatroomWindowPayload>) {
      const index = findChatroomIndex(payload.chatroomId, state.chatrooms);
      state.chatrooms[index].fold = payload.status;
      updateLocalChatrooms(payload.uid!, state.chatrooms);
    },
  },
});

export const {
  getChatrooms, openChatroom, removeChatroom, openChatroomWindow, closeChatroomWindow, updateChat,
  createChatroom, foldChatroomWindow, displayMoreList, pushChatroom,
} = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
