import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IGetPersonalPageArticleResponse {
  message: string;
  articles: IArticle[];
}

const articleApi = createApi({
  reducerPath: 'article',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_URL}`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${Cookies.get('Friendsbook')}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    publishArticle: builder.mutation<{ message: string }, IArticle>({
      query: (article) => ({
        url: '/auth/article',
        method: 'POST',
        body: article,
      }),
    }),
    getPersonalPageArticle: builder.query<IGetPersonalPageArticleResponse, void>(({
      query: () => '/auth/personal-page/articles',
    })),
  }),
});

export const {
  usePublishArticleMutation,
  useGetPersonalPageArticleQuery,
  useLazyGetPersonalPageArticleQuery,
} = articleApi;

export default articleApi;
