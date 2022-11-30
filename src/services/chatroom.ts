import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IGetChatroomsResponse {
  message: string;
  chatrooms: IChatroom[];
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
  }),
});

export const { useGetChatroomsQuery } = chatroomApi;

export default chatroomApi;
