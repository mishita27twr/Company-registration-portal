import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CompanyRegistration from '../pages/CompanyRegistration';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { ROUTES } from '../utils/constants';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route
        path={ROUTES.DASHBOARD}
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path={ROUTES.COMPANY_REGISTRATION}
        element={<ProtectedRoute><CompanyRegistration /></ProtectedRoute>}
      />
      <Route
        path={ROUTES.SETTINGS}
        element={<ProtectedRoute><Settings /></ProtectedRoute>}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
