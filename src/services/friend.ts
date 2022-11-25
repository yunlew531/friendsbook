import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IGetRecommendFriendsResponse {
  message: string;
  users: IProfile[];
}

interface IGetFriendsResponse {
  message: string;
  friends: {
    connected: IFriend[],
    received: IFriend[],
    sent: IFriend[],
  };
}

const friendApi = createApi({
  reducerPath: 'friend',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${Cookies.get('Friendsbook')}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRecommendFriends: builder.query<IGetRecommendFriendsResponse, number | void>({
      query: (num = 10) => `/friends/recommend/${num}`,
    }),
    addFriend: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/friend/add/${userId}`,
        method: 'POST',
        body: {},
      }),
    }),
    getFriendsByToken: builder.query<IGetFriendsResponse, void>({
      query: () => '/friends',
    }),
  }),
});

export const {
  useGetRecommendFriendsQuery,
  useAddFriendMutation,
  useGetFriendsByTokenQuery,
  useLazyGetFriendsByTokenQuery,
} = friendApi;

export default friendApi;
