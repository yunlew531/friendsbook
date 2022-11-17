import { configureStore } from '@reduxjs/toolkit';
import rtkQueryErrorLogger from 'middleware';
import accountApi from 'services/account';
import userApi from 'services/user';
import imageApi from 'services/image';
import articleApi from 'services/article';
import friendsApi from 'services/friends';
import { combineReducers } from 'redux';
import articleReducer, { articlesSlice } from 'slices/articlesSlice';
import userInfoReducer, { userInfoSlice } from './slices/userInfoSlice';

const reducers = combineReducers({
  [accountApi.reducerPath]: accountApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [imageApi.reducerPath]: imageApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [friendsApi.reducerPath]: friendsApi.reducer,
  [userInfoSlice.name]: userInfoReducer,
  [articlesSlice.name]: articleReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(accountApi.middleware)
    .concat(userApi.middleware)
    .concat(imageApi.middleware)
    .concat(articleApi.middleware)
    .concat(friendsApi.middleware)
    .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducers>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
