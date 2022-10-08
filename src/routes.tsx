import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Home from './pages/frontend/home';

const routes: RouteObject[] = [
  {
    path: '/home',
    element: <Home />,
  },
];

export default routes;
