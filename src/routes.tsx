import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Home from './pages/frontend/home';
import MyPage from './pages/frontend/myPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MyPage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];

export default routes;
