import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/use-auth';
import { ROUTES } from '../utils/routes';

import { removeUser, toggleForm } from '../store/userSlice';
import { clearVideosList } from '../store/videosSlice';
import { clearQueryList, getVideosByQuery } from '../store/searchSlice';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showForm } = useSelector((state) => state.user);

  const { isAuth, email } = useAuth();

  const channel_id = doc(db, 'subscriptions', `${email}`);

  const [value, setValue] = useState('');


  const logOutUser = () => {
    dispatch(removeUser());
    dispatch(clearVideosList());
    if (email) {
      try {
        updateDoc(channel_id, {
          channelsList: []
        })
        console.log('cleared');
      } catch (error) {
        console.log(error)
      }
    }
    navigate(ROUTES.LOGIN)
  }

  const handleSubmit = (e, value) => {
    e.preventDefault();
    dispatch(getVideosByQuery(value));
    setValue('');
    navigate(ROUTES.RESULTS)
    dispatch(clearQueryList());
  }

  const handleClick = () => {
    if (!showForm) {
      dispatch(toggleForm(true))
    } else {
      dispatch(toggleForm(false))
    }
  }

  return (
    <div className='flex w-full items-center justify-between py-4 px-6'>
      <div className='flex items-center justify-center'>
        <div className='hover:bg-zinc-800 p-2 rounded-full z-[200] md:mr-4'>
          <RxHamburgerMenu className='cursor-pointer' size={24} onClick={handleClick} />
        </div>
        <div className='text-2xl font-bold hidden md:block z-[200]'>
          <Link to={ROUTES.HOME}>
            <h1 className='text-red-600 text-xl tracking-tighter'>YouTubeApp</h1>
          </Link>
        </div>
      </div>
      {isAuth && <form onSubmit={(e) => handleSubmit(e, value)} className='flex relative w-[200px] md:w-[350px] min-[1080px]:w-[500px]'>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Введите запрос'
          className='w-full px-4 py-2 pr-10 rounded-lg bg-transparent border-[1px] border-zinc-700 placeholder:text-zinc-400 focus:border-red-600'
        />
        <button type="submit" className='absolute top-[8px] right-4'><IoSearch size={24} /></button>
      </form>}

      <div className='flex items-center'>
        {isAuth && (<button onClick={logOutUser} className='bg-red-600 text-white font-bold px-4 py-2 rounded-md hidden min-[425px]:block'>Log out</button>)}
      </div>
    </div>
  )
}

export default Header;