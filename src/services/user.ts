import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type RegisterForm = Required<Pick<IUser, 'username' | 'email' | 'password'>>;

interface IRegisterResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }),
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
