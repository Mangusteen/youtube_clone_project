import React from 'react';
import Login from '../components/User/Login';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/routes';

const LoginPage = () => {
  return (
    <div className='flex flex-col justify-center items-center text-white max-w-[400px] md:max-w-[500px] h-[480px] md:h-[600px] mx-auto bg-zinc-800 py-4 px-16 rounded-md'>
      <h1 className='text-3xl font-bold mb-4'>Login</h1>
      <Login />
      <div className='flex flex-col justify-center min-[375px]:flex-row items-center'>
        <p className='text-gray-400 text-sm max-[375px]:mb-4 min-[375px]:mr-8'>New to YouTubeApp?</p>
        <Link to={ROUTES.SIGN_UP}>
          <p className='hover:text-gray-400 hover:underline'>Sign up mow</p>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage;