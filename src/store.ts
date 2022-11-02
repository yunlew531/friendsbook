import { configureStore } from '@reduxjs/toolkit';
import { accountApi } from 'services/account';
import { userApi } from 'services/user';
import rtkQueryErrorLogger from 'middleware';
import { combineReducers } from 'redux';
import userInfoReducer from './slices/userInfoSlice';

const reducers = combineReducers({
  [accountApi.reducerPath]: accountApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  userInfo: userInfoReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(accountApi.middleware)
    .concat(userApi.middleware)
    .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reducers>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
