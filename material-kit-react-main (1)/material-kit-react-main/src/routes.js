import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// Importa los componentes de las páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Importa el componente RegisterPage
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SearchPage from './pages/SearchPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register', 
      element: <RegisterPage />
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'search', element: <SearchPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}