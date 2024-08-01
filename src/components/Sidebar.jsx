import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/routes';

import { SiYoutubeshorts } from "react-icons/si";
import { GoHistory } from "react-icons/go";
import { MdHomeFilled, MdSubscriptions } from "react-icons/md";



const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState('Главная');

  const changeCategory = (category) => {
    setSelectedCategory(category);
  }

  return (
    <div className='w-[80px] h-full mr-8 pt-2'>
      <ul className='flex flex-col'>
        <Link to={ROUTES.HOME} className={selectedCategory === 'Главная' ? 'mb-6 hover:bg-zinc-800 p-2 rounded-md bg-zinc-800' : 'mb-6 hover:bg-zinc-800 p-2 rounded-md'} onClick={() => changeCategory('Главная')} >
          <div className='flex flex-col items-center'>
            <MdHomeFilled size={24} className='' />
            <span className='text-xs tracking-tight'>Главная</span>
          </div>
        </Link>
        <Link className={selectedCategory === 'Shorts' ? 'mb-6 hover:bg-zinc-800 p-2 rounded-md bg-zinc-800' : 'mb-6 hover:bg-zinc-800 p-2 rounded-md'} onClick={() => changeCategory('Shorts')}>
          <div className='flex flex-col items-center '>
            <SiYoutubeshorts size={24} className='' />
            <span className='text-xs tracking-tight'>Shorts</span>
          </div>
        </Link>
        <Link to={ROUTES.SUBSCRIPTION} className={selectedCategory === 'Подписки' ? 'mb-6 hover:bg-zinc-800 p-2 rounded-md bg-zinc-800' : 'mb-6 hover:bg-zinc-800 p-2 rounded-md'} onClick={() => changeCategory('Подписки')}>
          <div className='flex flex-col items-center'>
            <MdSubscriptions size={24} className='' />
            <span className='text-xs tracking-tight'>Подписки</span>
          </div>
        </Link>
        <Link className={selectedCategory === 'История' ? 'mb-6 hover:bg-zinc-800 p-2 rounded-md bg-zinc-800' : 'mb-6 hover:bg-zinc-800 p-2 rounded-md'} onClick={() => changeCategory('История')}>
          <div className='flex flex-col items-center'>
            <GoHistory size={24} className='' />
            <span className='text-xs tracking-tight'>История</span>
          </div>
        </Link>
      </ul>
    </div >
  )
}



export default Sidebar;