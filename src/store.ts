import { configureStore } from '@reduxjs/toolkit';
import { accountApi } from 'services/account';
import { userApi } from 'services/user';
import userInfoReducer from './slices/userInfoSlice';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userInfo: userInfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
