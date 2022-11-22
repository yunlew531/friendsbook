import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IUploadImgResponse {
  message: string;
  url: string;
}

interface IGetImgsByUidResponse {
  message: string;
  images: IImage[];
}

const imageApi = createApi({
  reducerPath: 'image',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_URL}`,
    prepareHeaders(headers) {
      headers.set('Authorization', `Bearer ${Cookies.get('Friendsbook')}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadImg: builder.mutation<IUploadImgResponse, FormData>({
      query: (formData) => ({
        url: '/image',
        method: 'POST',
        body: formData,
      }),
    }),
    getImgsByUid: builder.query<IGetImgsByUidResponse, string>({
      query: (userUid) => `/images/${userUid}`,
    }),
    postBannerImg: builder.mutation<IUploadImgResponse, FormData>({
      query: (formData) => ({
        url: '/image/banner',
        method: 'POST',
        body: formData,
      }),
    }),
    postAvatarImg: builder.mutation<IUploadImgResponse, FormData>({
      query: (formData) => ({
        url: '/image/avatar',
        method: 'POST',
        body: formData,
      }),
    }),
    deleteImg: builder.mutation<{ message:string }, string>({
      query: (imageId) => ({
        url: `/image/${imageId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUploadImgMutation,
  useLazyGetImgsByUidQuery,
  usePostBannerImgMutation,
  usePostAvatarImgMutation,
  useDeleteImgMutation,
} = imageApi;

export default imageApi;
