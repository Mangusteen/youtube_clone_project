import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import Register from '../pages/Register';
import WatchPage from '../pages/WatchPage';
import SubscriptionPage from '../pages/SubscriptionPage';
import ResultsPage from '../pages/ResultsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGN_UP} element={<Register />} />
      <Route path={ROUTES.WATCH} element={<WatchPage />} />
      <Route path={ROUTES.SUBSCRIPTION} element={<SubscriptionPage />} />
      <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
    </Routes>
  )
}

export default AppRoutes;