import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface ILoginResponse {
  message: string;
  token: string;
}

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }) as BaseQueryFn<string | FetchArgs, unknown, IErrorResult, {}>,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, Required<Pick<IUser, 'email' | 'password'>>>({
      query: (body) => ({
        url: '/account',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = accountApi;
