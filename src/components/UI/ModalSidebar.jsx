import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { removeUser, toggleForm } from '../../store/userSlice';
import { clearVideosList } from '../../store/videosSlice';

import { db } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../hook/use-auth';
import { ROUTES } from '../../utils/routes';

import { SiYoutubeshorts } from 'react-icons/si';
import { GoHistory } from 'react-icons/go';
import { MdHomeFilled, MdSubscriptions } from 'react-icons/md';

const ModalSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showForm } = useSelector((state) => state.user);

  const [selectedCategory, setSelectedCategory] = useState('Главная');

  const changeCategory = (category) => {
    setSelectedCategory(category);
  }

  const { email } = useAuth();

  const channel_id = doc(db, 'subscriptions', `${email}`);

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
    dispatch(toggleForm(false))
  }

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [showForm])

  return (
    showForm ?
      (<>
        <div className='fixed left-[220px] w-full h-full bg-zinc-900/70 z-[100]' onClick={() => dispatch(toggleForm(false))}></div>
        <div className='absolute left-0 top-0 bg-zinc-900 h-full w-[220px] z-[100] px-6 pt-20'>
          <ul className='flex flex-col'>
            <Link to={ROUTES.HOME} className={selectedCategory === 'Главная' ? 'mb-6 hover:bg-zinc-800 p-2 rounded-md bg-zinc-800' : 'mb-6 hover:bg-zinc-800 p-2 rounded-md'} onClick={() => changeCategory('Главная')} >
              <div className='flex items-center relative'>
                <MdHomeFilled size={24} className='absolute left-0' />
                <span className='tracking-tight pl-12 text-base'>Главная</span>
              </div>
            </Link>
            <Link className={selectedCategory === 'Shorts' ? 'mb-6 hover:bg-zinc-800 p-2 rounded-md bg-zinc-800' : 'mb-6 hover:bg-zinc-800 p-2 rounded-md'} onClick={() => changeCategory('Shorts')}>
              <div className='flex items-center relative'>
                <SiYoutubeshorts size={24} className='absolute left-0' />
                <span className='tracking-tight pl-12 text-base'>Shorts</span>
              </div>
            </Link>
            <Link to={ROUTES.SUBSCRIPTION} className={selectedCategory === 'Подписки' ? 'mb-6 hover:bg-zinc-800 p-2 rounded-md bg-zinc-800' : 'mb-6 hover:bg-zinc-800 p-2 rounded-md'} onClick={() => changeCategory('Подписки')}>
              <div className='flex items-center relative'>
                <MdSubscriptions size={24} className='absolute left-0' />
                <span className='tracking-tight pl-12 text-base'>Подписки</span>
              </div>
            </Link>
            <Link className={selectedCategory === 'История' ? 'mb-6 hover:bg-zinc-800 p-2 rounded-md bg-zinc-800' : 'mb-6 hover:bg-zinc-800 p-2 rounded-md'} onClick={() => changeCategory('История')}>
              <div className='flex items-center relative'>
                <GoHistory size={24} className='absolute left-0' />
                <span className='tracking-tight pl-12 text-base'>История</span>
              </div>
            </Link>
          </ul>
          <div className='flex justify-center'>
            <button onClick={logOutUser} className='bg-red-600 text-white font-bold px-4 py-2 rounded-md flex z-[300] min-[425px]:hidden'>Log out</button>
          </div>

        </div>

      </>

      ) : (<></>)
  )
}

export default ModalSidebar;