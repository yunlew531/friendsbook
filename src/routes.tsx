import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Homepage from 'pages/frontend/MyPage/Index/Homepage';
import Login from 'pages/frontend/Login';
import Groups from 'pages/frontend/MyPage/Index/Groups';
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
        path: '/groups',
        element: <Groups />,
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
