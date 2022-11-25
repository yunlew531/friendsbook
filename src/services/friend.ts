import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IGetRecommendFriendsResponse {
  message: string;
  users: IProfile[];
}

interface IGetFriendsResponse {
  message: string;
  friends: IFriends;
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
    sentFriendInvite: builder.mutation<{ message: string }, string>({
      query: (userUid) => ({
        url: `/friend/invite/${userUid}`,
        method: 'POST',
        body: {},
      }),
    }),
    getFriendsByToken: builder.query<IGetFriendsResponse, void>({
      query: () => '/friends',
    }),
    removeFriendInvite: builder.mutation<{ message: string, code: number }, string>({
      query: (friendId) => ({
        url: `/friend/invite/${friendId}`,
        method: 'DELETE',
      }),
    }),
    deleteFriend: builder.mutation<{ message: string }, string>({
      query: (friendId) => ({
        url: `/friend/${friendId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRecommendFriendsQuery,
  useSentFriendInviteMutation,
  useGetFriendsByTokenQuery,
  useLazyGetFriendsByTokenQuery,
  useRemoveFriendInviteMutation,
  useDeleteFriendMutation,
} = friendApi;

export default friendApi;
