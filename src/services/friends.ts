import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IGetRecommendFriendsResponse {
  message: string;
  users: IProfile[];
}

const friendsApi = createApi({
  reducerPath: 'friends',
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
  }),
});

export default friendsApi;

export const {
  useGetRecommendFriendsQuery,
} = friendsApi;
