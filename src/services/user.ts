import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

type RegisterForm = Required<Pick<IProfile, 'name' | 'email' | 'password'>>;

interface IRegisterResponse {
  message: string;
}

interface IGetProfileByUidResponse {
  message: string;
  profile: IProfile;
}

const userApi = createApi({
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
        url: '/account',
        method: 'POST',
        body,
      }),
    }),
    getUserByToken: builder.query<IGetProfileByUidResponse, void>({
      query: () => '/user',
    }),
    getUserByUid: builder.query<IGetProfileByUidResponse, string>({
      query: (userUid) => `/user/${userUid}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserByTokenQuery,
  useLazyGetUserByTokenQuery,
  useLazyGetUserByUidQuery,
} = userApi;

export default userApi;
