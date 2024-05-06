import React from 'react';
import { Navigate, useRoutes, BrowserRouter, Routes, Route} from 'react-router-dom';
// Importa los componentes de las páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import SearchPage from './pages/SearchPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

export default function Router() {

  return(
    <div>
      <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard/app" element={<DashboardAppPage />} />
            <Route path="/dashboard/search" element={<SearchPage />} />
          </Route> 
          <Route path="*" element={<Page404 />} />
      </Routes>
    </div>);
}