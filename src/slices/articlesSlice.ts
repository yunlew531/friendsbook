import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  articles: IArticle[];
}

const initialState: IInitialState = {
  articles: [],
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles(state, { payload }: PayloadAction<IArticle[]>) {
      state.articles = payload;
    },
    refreshComments(
      state,
      { payload }: PayloadAction<{ articleId: string, comments: IComment[] }>,
    ) {
      const { articleId, comments } = payload;
      const articleIndex = state.articles.findIndex((article) => article.id === articleId);
      state.articles[articleIndex].comments = comments;
    },
    refreshThumbsUp(
      state,
      { payload }: PayloadAction<{ articleId:string, thumbs_up: IThumbsUp[] }>,
    ) {
      const { articleId, thumbs_up: thumbsUp } = payload;
      const idx = state.articles.findIndex((article) => article.id === articleId);
      if (idx !== -1) { state.articles[idx].thumbs_up = thumbsUp; }
    },
  },
});

export const { getArticles, refreshComments, refreshThumbsUp } = articlesSlice.actions;

export default articlesSlice.reducer;
