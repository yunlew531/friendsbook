import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface ILoginResponse {
  message: string;
  token: string;
  uid: string;
}

interface ICheckLoginResponse {
  message: string;
  uid: string;
}

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${Cookies.get('Friendsbook') as string}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, Required<Pick<IUser, 'email' | 'password'>>>({
      query: (body) => ({
        url: '/account',
        method: 'POST',
        body,
      }),
    }),
    checkLogin: builder.query<ICheckLoginResponse, null>({
      query: () => '/account/check',
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckLoginQuery,
} = accountApi;
