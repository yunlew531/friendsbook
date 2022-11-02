import { configureStore } from '@reduxjs/toolkit';
import { accountApi } from 'services/account';
import userInfoReducer from './slices/userInfoSlice';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    userInfo: userInfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
