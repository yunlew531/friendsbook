import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Login from 'pages/frontend/Login';
import Home from 'pages/frontend/Home';
import Homepage from 'pages/frontend/MyPage/Index/Homepage';
import MyPage from 'pages/frontend/MyPage';
import Clubs from 'pages/frontend/MyPage/Index/Clubs';
import Club from 'pages/frontend/MyPage/Index/Club';
import ClubIndex from 'pages/frontend/MyPage/Index/Club/index';
import ClubMembers from 'pages/frontend/MyPage/Index/Club/ClubMembers';
import Fans from 'pages/frontend/MyPage/Index/Fans';
import Fan from 'pages/frontend/MyPage/Index/Fan';
import FanIndex from 'pages/frontend/MyPage/Index/Fan/index';
import FanAbout from 'pages/frontend/MyPage/Index/Fan/About';

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
        path: '/club/:id',
        element: <Club />,
        children: [
          {
            path: '/club/:id',
            element: <ClubIndex />,
          },
          {
            path: '/club/:id/members',
            element: <ClubMembers />,
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
