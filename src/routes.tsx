import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Homepage from 'pages/frontend/myPage/Index/Homepage';
import Home from './pages/frontend/home';
import MyPage from './pages/frontend/myPage';

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
];

export default routes;
