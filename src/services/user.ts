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
        url: '/user',
        method: 'POST',
        body,
      }),
    }),
    getUserByToken: builder.query<IGetProfileByUidResponse, void>({
      query: () => '/auth/user',
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserByTokenQuery,
  useLazyGetUserByTokenQuery,
} = userApi;

export default userApi;
