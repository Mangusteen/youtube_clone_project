import React from 'react';
import { useAuth } from '../hook/use-auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Subscription from '../components/Subscription';
import { ROUTES } from '../utils/routes';


const SubscriptionPage = () => {
  const { isAuth } = useAuth();

  return isAuth ?
    (<>
      <Sidebar />
      <Subscription />
    </>) :
    (<Routes>
      <Route path='*' element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
    )
}

export default SubscriptionPage;