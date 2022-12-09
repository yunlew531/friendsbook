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

interface IGetFriendsByUidResponse {
  message: string;
  friends: IFriend[];
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
    getFriendsByUid: builder.query<IGetFriendsByUidResponse, string>({
      query: (userUid) => `/friends/${userUid}`,
    }),
    removeFriendInvite: builder.mutation<{ message: string, code: number }, string>({
      query: (friendId) => ({
        url: `/friend/invite/${friendId}`,
        method: 'DELETE',
      }),
    }),
    agreeToBeFriend: builder.mutation<{ message: string }, string>({
      query: (friendId) => ({
        url: `/friend/invite/${friendId}`,
        method: 'PATCH',
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
  useLazyGetFriendsByUidQuery,
  useLazyGetFriendsByTokenQuery,
  useRemoveFriendInviteMutation,
  useDeleteFriendMutation,
  useAgreeToBeFriendMutation,
} = friendApi;

export default friendApi;
