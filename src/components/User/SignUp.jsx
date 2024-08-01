import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from '../../firebase/firebase';

import Form from './Form';
import { ROUTES } from '../../utils/routes';


const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const handleCreateUser = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(setUser({
          email: user.email,
          token: user.accessToken,
          userId: user.uid
        }))
        setDoc(doc(db, 'subscriptions', email), {
          channelsList: []
        })
        navigate(ROUTES.HOME)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <Form title='Sign Up' handleClick={handleCreateUser} error={error} />
  )
}

export default SignUp;