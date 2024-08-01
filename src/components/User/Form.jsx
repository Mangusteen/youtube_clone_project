import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = ({ title, handleClick, error }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      {error && <p className='bg-red-400 py-2 px-4'>{error}</p>}
      <form onSubmit={handleSubmit} className='w-full flex-col py-3 mb-4 '>
        <input className="bg-black/60 border-[1px] border-gray-100/50 rounded-sm w-full p-4 text-white mb-4" type="email"
          placeholder='Email'
          autoComplete='current email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="bg-black/60 border-[1px] border-gray-100/50 rounded-sm w-full p-4 text-white mb-4" type="password"
          placeholder='Password'
          autoComplete='current password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleClick(email, password)} className='bg-red-600 rounded-sm hover:bg-red-700 text-white font-bold px-4 py-3 w-full'>{title}</button>
      </form>
      <div className='flex'>
      </div>
    </>
  )
}

export default Form;