import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ROUTES } from '../../utils/routes';
import { setUser } from '../../store/userSlice';
import Form from './Form';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({
          email: user.email,
          token: user.accessToken,
          userId: user.uid
        }))
        navigate(ROUTES.HOME)
      })
      .catch((error) => {
        setError(error.message)
      })
  }


  return (
    <Form title='Sign In' handleClick={handleLogin} error={error} />
  )
}

export default Login;