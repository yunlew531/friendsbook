import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Login from 'pages/frontend/Login';
import Home from 'pages/frontend/Home';
import Homepage from 'pages/frontend/MyPage/Index/Homepage';
import MyPage from 'pages/frontend/MyPage';
import Clubs from 'pages/frontend/MyPage/Index/Clubs';
import Club from 'pages/frontend/MyPage/Index/Club';
import ClubPosts from 'pages/frontend/MyPage/Index/Club/Posts';
import ClubSales from 'pages/frontend/MyPage/Index/Club/Sales';
import ClubMembers from 'pages/frontend/MyPage/Index/Club/Members';
import ClubPhotos from 'pages/frontend/MyPage/Index/Club/Photos';
import Fans from 'pages/frontend/MyPage/Index/Fans';
import Fan from 'pages/frontend/MyPage/Index/Fan';
import FanIndex from 'pages/frontend/MyPage/Index/Fan/index';
import FanAbout from 'pages/frontend/MyPage/Index/Fan/About';
import FanPhotos from 'pages/frontend/MyPage/Index/Fan/Photos';
import FanFollows from 'pages/frontend/MyPage/Index/Fan/Follows';
import Settings from 'pages/frontend/MyPage/Index/Settings';
import General from 'pages/frontend/MyPage/Index/Settings/General';
import Account from 'pages/frontend/MyPage/Index/Settings/Account';
import User from 'pages/frontend/MyPage/Index/User';
import UserIndex from 'pages/frontend/MyPage/Index/User/index';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MyPage />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/clubs',
        element: <Clubs />,
      },
      {
        path: '',
        element: <Club />,
        children: [
          {
            path: '/club/:id',
            element: <ClubSales />,
          },
          {
            path: '/club/:id/posts',
            element: <ClubPosts />,
          },
          {
            path: '/club/:id/members',
            element: <ClubMembers />,
          },
          {
            path: '/club/:id/photos',
            element: <ClubPhotos />,
          },
        ],
      },
      {
        path: '/fans',
        element: <Fans />,
      },
      {
        path: '',
        element: <Fan />,
        children: [
          {
            path: '/fan/:id',
            element: <FanIndex />,
          },
          {
            path: '/fan/:id/about',
            element: <FanAbout />,
          },
          {
            path: '/fan/:id/photos',
            element: <FanPhotos />,
          },
          {
            path: '/fan/:id/follows',
            element: <FanFollows />,
          },
        ],
      },
      {
        path: '/settings',
        element: <Settings />,
        children: [
          {
            path: '/settings/general',
            element: <General />,
          },
          {
            path: '/settings/account',
            element: <Account />,
          },
        ],
      },
      {
        path: '/',
        element: <User />,
        children: [
          {
            path: '/:uid',
            element: <UserIndex />,
          },
          // {
          //   path: '/:uid/about',
          //   element: <FanAbout />,
          // },
          // {
          //   path: '/:uid/photos',
          //   element: <FanPhotos />,
          // },
          // {
          //   path: '/:uid/clubs',
          //   element: <FanAbout />,
          // },
          // {
          //   path: '/:uid/fans',
          //   element: <FanPhotos />,
          // },
        ],
      },
    ],
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
