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
      const token = Cookies.get('Friendsbook');
      if (token) headers.set('authorization', `Bearer ${Cookies.get('Friendsbook')}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, Required<Pick<IProfile, 'email' | 'password'>>>({
      query: (body) => ({
        url: '/account',
        method: 'POST',
        body,
      }),
    }),
    checkLogin: builder.query<ICheckLoginResponse, void>({
      query: () => '/account/check',
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckLoginQuery,
} = accountApi;
