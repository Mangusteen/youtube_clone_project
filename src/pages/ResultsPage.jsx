import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hook/use-auth';
import Sidebar from '../components/Sidebar';
import Results from '../components/Results/Results';
import { ROUTES } from '../utils/routes';

const ResultsPage = () => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <>
      <Sidebar />
      <Results />
    </>
  ) : (
    <Routes>
      <Route path='*' element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  )
}

export default ResultsPage;