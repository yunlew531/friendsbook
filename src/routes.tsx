import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Homepage from 'pages/frontend/MyPage/Index/Homepage';
import Login from 'pages/frontend/Login';
import Club from 'pages/frontend/MyPage/Index/Club';
import Clubs from 'pages/frontend/MyPage/Index/Clubs';
import Home from './pages/frontend/Home';
import MyPage from './pages/frontend/MyPage';

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
