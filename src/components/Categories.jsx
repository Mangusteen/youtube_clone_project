import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { clearCategoryList, getActiveCategory, getVideosByCategory } from '../store/categorySlice';
import React from 'react';

const Categories = () => {

  const categories = [
    'Все',
    'Музыка',
    'Сейчас в эфире',
    'Видеоигры',
    'Туризм',
    'Кулинария',
    'Природа',
    'Экшен и приключения',
    'Недавно опубликованные',
    'Просмотрено',
    'Новое',
  ]

  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.categories);

  const handleClick = (category) => {
    dispatch(getVideosByCategory(category));
    dispatch(getActiveCategory(category));
    dispatch(clearCategoryList());
  }

  const slideToRight = () => {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 200;
  }
  const slideToLeft = () => {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 200;
  }

  return (
    <div className='flex items-center text-white mb-8 relative group'>
      <FaChevronLeft className='absolute left-0 hidden rounded-full bg-zinc-900 p-2 hover:opacity-100 group-hover:block min-[1320px]:group-hover:hidden' onClick={slideToLeft} size={30} />
      <div id='slider' className='flex max-w-[320px] min-[550px]:max-w-[500px] min-[700px]:max-w-[600px] min-[850px]:max-w-[800px] min-[1024px]:max-w-[1000px] min-[1320px]:max-w-[1300px] h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide pr-4'>
        {categories.map((category) =>
          <span key={category.id} onClick={() => handleClick(category)} className={activeCategory === category ? 'py-2 px-2 bg-white rounded-md font-semibold text-gray-900 text-sm mr-4 cursor-pointer' : 'py-2 px-2 bg-zinc-800 rounded-md font-semibold text-sm mr-4 cursor-pointer hover:bg-zinc-700'}>{category}</span>
        )}
      </div>
      <FaChevronRight className='absolute hidden right-0 rounded-full bg-zinc-900 p-2 hover:opacity-100 group-hover:block min-[1320px]:group-hover:hidden' onClick={slideToRight} size={30} />
    </div>
  )
}

export default Categories;