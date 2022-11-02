import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

type RegisterForm = Required<Pick<IUser, 'username' | 'email' | 'password'>>;

interface IRegisterResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }) as BaseQueryFn<string | FetchArgs, unknown, IErrorResult, {}>,
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, RegisterForm>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
} = userApi;
