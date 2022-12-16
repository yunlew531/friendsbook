import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IGetNotificationsResponse {
  message: string;
  notifications: INotification[];
}

const notificationApi = createApi({
  reducerPath: 'notification',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_URL}`,
    prepareHeaders(headers) {
      headers.set('Authorization', `Bearer ${Cookies.get('Friendsbook')}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotificationsByToken: builder.query<IGetNotificationsResponse, void | string>({
      query: () => '/notifications',
    }),
  }),
});

export const { useGetNotificationsByTokenQuery } = notificationApi;

export default notificationApi;
