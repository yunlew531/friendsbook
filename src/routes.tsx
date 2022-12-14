import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Login from 'pages/frontend/Login';
import Home from 'pages/frontend/Home';
import Homepage from 'pages/frontend/Index/Index/Homepage';
import Index from 'pages/frontend/Index';
import Clubs from 'pages/frontend/Index/Index/Clubs';
import Club from 'pages/frontend/Index/Index/Club';
import ClubPosts from 'pages/frontend/Index/Index/Club/Posts';
import ClubSales from 'pages/frontend/Index/Index/Club/Sales';
import ClubMembers from 'pages/frontend/Index/Index/Club/Members';
import ClubPhotos from 'pages/frontend/Index/Index/Club/Photos';
import Fans from 'pages/frontend/Index/Index/Fans';
import Fan from 'pages/frontend/Index/Index/Fan';
import FanIndex from 'pages/frontend/Index/Index/Fan/index';
import FanAbout from 'pages/frontend/Index/Index/Fan/About';
import FanPhotos from 'pages/frontend/Index/Index/Fan/Photos';
import FanFollows from 'pages/frontend/Index/Index/Fan/Follows';
import Settings from 'pages/frontend/Index/Index/Settings';
import General from 'pages/frontend/Index/Index/Settings/General';
import Account from 'pages/frontend/Index/Index/Settings/Account';
import User from 'pages/frontend/Index/Index/User';
import UserIndex from 'pages/frontend/Index/Index/User/index';
import Friends from 'pages/frontend/Index/Index/User/Friends';
import Photos from 'pages/frontend/Index/Index/User/Photos';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
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
          {
            path: '/:uid/photos',
            element: <Photos />,
          },
          {
            path: '/:uid/friends',
            element: <Friends />,
          },
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
