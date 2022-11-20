import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IUploadImgResponse {
  message: string;
  url: string;
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
  }),
});

export const {
  useUploadImgMutation,
} = imageApi;

export default imageApi;
