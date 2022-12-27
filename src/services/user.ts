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

interface IAlternateEmailResponse {
  message: string;
  alternate_email: string[];
}

interface IPatchAlternateEmailRequest {
  email: string;
  new_email: string;
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
      query: ({ profileKey, value }) => ({
        url: `/user/profile/${profileKey}`,
        method: 'PATCH',
        body: { value },
      }),
    }),
    increaseAlternateEmail: builder.mutation<IAlternateEmailResponse, string>({
      query: (email) => ({
        url: `/user/profile/email/${email}`,
        method: 'POST',
        body: '',
      }),
    }),
    patchAlternateEmail: builder.mutation<IAlternateEmailResponse, IPatchAlternateEmailRequest>({
      query: ({ email, new_email }) => ({
        url: `/user/profile/email/${email}`,
        method: 'PATCH',
        body: { email: new_email },
      }),
    }),
    deleteAlternateEmail: builder.mutation({
      query: (email) => ({
        url: `/user/profile/email/${email}`,
        method: 'DELETE',
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
  useIncreaseAlternateEmailMutation,
  useDeleteAlternateEmailMutation,
  usePatchAlternateEmailMutation,
} = userApi;

export default userApi;
