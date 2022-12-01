import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IGetChatroomsResponse {
  message: string;
  chatrooms: IChatroom[];
}

interface ICreateChatroomResponse {
  message: string;
  chatroom: IChatroom;
}

const chatroomApi = createApi({
  reducerPath: 'chatroom',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${Cookies.get('Friendsbook')}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChatrooms: builder.query<IGetChatroomsResponse, void>({
      query: () => '/chatrooms',
    }),
    createChatroom: builder.mutation<ICreateChatroomResponse, IChatroom>({
      query: (chatroom) => ({
        url: '/chatroom',
        method: 'POST',
        body: chatroom,
      }),
    }),
  }),
});

export const { useGetChatroomsQuery, useCreateChatroomMutation } = chatroomApi;

export default chatroomApi;
