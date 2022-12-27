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

interface IPatchProfileResponse {
  message: string;
  [key: string]: any;
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
    patchProfile: builder.mutation<IPatchProfileResponse, { value: string, profileKey: string }>({
      query: (body) => ({
        url: `/user/profile/${body.profileKey}`,
        method: 'PATCH',
        body: { value: body.value },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserByTokenQuery,
  useLazyGetUserByTokenQuery,
  useLazyGetUserByUidQuery,
  usePatchProfileMutation,
} = userApi;

export default userApi;
