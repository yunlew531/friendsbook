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
  },
});

export const { getArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
