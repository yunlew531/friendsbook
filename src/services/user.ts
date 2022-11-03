import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

type RegisterForm = Required<Pick<IProfile, 'username' | 'email' | 'password'>>;

interface IRegisterResponse {
  message: string;
}

interface IGetProfileByUidResponse {
  message: string;
  profile: IProfile;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('Friendsbook');
      if (token) headers.set('authorization', `Bearer ${Cookies.get('Friendsbook')}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, RegisterForm>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body,
      }),
    }),
    getUserByUid: builder.query<IGetProfileByUidResponse, string | 'owner'>({
      query: (uid) => `/user/${uid}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserByUidQuery,
  useLazyGetUserByUidQuery,
} = userApi;
