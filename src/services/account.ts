import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ILoginResponse {
  message: string;
  token: string;
}

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, Required<Pick<IUser, 'email' | 'password'>>>({
      query: (body) => ({
        url: '/account',
        method: 'POST',
        body,
      }),
    }),
    checkLogin: builder.query({
      query: () => '/account/check',
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckLoginQuery,
} = accountApi;
