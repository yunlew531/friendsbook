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
    getPersonalPageArticle: builder.query<IGetPersonalPageArticleResponse, void>(({
      query: () => '/articles',
    })),
    publishArticle: builder.mutation<{ message: string }, { content: string }>({
      query: (article) => ({
        url: '/article',
        method: 'POST',
        body: article,
      }),
    }),
    postComment: builder.mutation<{ message: string }, { articleId: string, content: string }>({
      query: ({ articleId, content }) => ({
        url: `/article/${articleId}/comment`,
        method: 'POST',
        body: { content },
      }),
    }),
    getCommentsByArticleId: builder.query({
      query: (articleId: string) => `/article/${articleId}/comments`,
    }),
  }),
});

export const {
  usePublishArticleMutation,
  useGetPersonalPageArticleQuery,
  useLazyGetPersonalPageArticleQuery,
  usePostCommentMutation,
  useLazyGetCommentsByArticleIdQuery,
} = articleApi;

export default articleApi;
