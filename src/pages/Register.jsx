import React from 'react'
import { Link } from 'react-router-dom'
import SignUp from '../components/User/SignUp'
import { ROUTES } from '../utils/routes'

const Register = () => {
  return (
    <div className='flex flex-col justify-center items-center text-white max-w-[400px] md:max-w-[500px] h-[480px] md:h-[600px] mx-auto bg-zinc-800 py-4 px-16 rounded-md'>
      <h1 className='text-3xl font-bold mb-4'>Sign up</h1>
      <SignUp />
      <div className='flex flex-col justify-center min-[375px]:flex-row items-center'>
        <p className='text-gray-400 text-sm max-[375px]:mb-4 min-[375px]:mr-8'>Already have an account?</p>
        <Link to={ROUTES.LOGIN}>
          <p className='hover:text-gray-400 hover:underline'>Sign in now</p>
        </Link>
      </div>
    </div>
  )
}

export default Register;