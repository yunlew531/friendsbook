import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Homepage from 'pages/frontend/MyPage/Index/Homepage';
import Login from 'pages/frontend/Login';
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
