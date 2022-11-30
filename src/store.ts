import { configureStore } from '@reduxjs/toolkit';
import rtkQueryErrorLogger from 'middleware';
import accountApi from 'services/account';
import userApi from 'services/user';
import imageApi from 'services/image';
import articleApi from 'services/article';
import friendApi from 'services/friend';
import chatroomApi from 'services/chatroom';
import { combineReducers } from 'redux';
import articlesReducer, { articlesSlice } from 'slices/articlesSlice';
import friendsReducer, { friendsSlice } from 'slices/friendsSlice';
import userInfoReducer, { userInfoSlice } from 'slices/userInfoSlice';
import chatroomsReducer, { chatroomsSlice } from 'slices/chatroomsSlice';

const reducers = combineReducers({
  [accountApi.reducerPath]: accountApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [imageApi.reducerPath]: imageApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [friendApi.reducerPath]: friendApi.reducer,
  [chatroomApi.reducerPath]: chatroomApi.reducer,
  [userInfoSlice.name]: userInfoReducer,
  [articlesSlice.name]: articlesReducer,
  [friendsSlice.name]: friendsReducer,
  [chatroomsSlice.name]: chatroomsReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(accountApi.middleware)
    .concat(userApi.middleware)
    .concat(imageApi.middleware)
    .concat(articleApi.middleware)
    .concat(friendApi.middleware)
    .concat(chatroomApi.middleware)
    .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducers>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
