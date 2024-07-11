import React from 'react';
import { Navigate, useRoutes, BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/dashboard';
import SearchPage from './pages/SearchPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import { MovieListProvider } from 'src/components/list-context/index.js'; // Import the MovieListProvider

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <MovieListProvider> {/* Wrap only the dashboard routes with MovieListProvider */}
            <DashboardLayout />
          </MovieListProvider>
        }>
          <Route path="/dashboard/app" element={<DashboardAppPage />} />
          <Route path="/dashboard/search" element={<SearchPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
