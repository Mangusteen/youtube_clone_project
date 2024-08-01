import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLikes } from '../../store/commentsSlice';
import 'moment/locale/ru';
import moment from "moment/min/moment-with-locales";
import { SlLike, SlDislike } from "react-icons/sl";


const Comment = ({ content, length }) => {

  const dispatch = useDispatch();
  const { likesList } = useSelector((state) => state.comments);
  const { snippet } = content;
  const { authorDisplayName, authorProfileImageUrl, textDisplay, publishedAt, likeCount } = snippet;

  useEffect(() => {
    if (likesList < length) dispatch(addLikes(likeCount));
  }, [likeCount, likesList, length])

  return (
    <div className='flex mb-6 min-[992px]:mb-8'>
      <div className='rounded-full w-[40px] h-[40px] mr-4'>
        <img className='rounded-full' src={authorProfileImageUrl} alt="" />
      </div>
      <div className='flex flex-col mb-2'>
        <div className='flex text-sm mb-2'>
          <p className='text-white mr-2 font-medium'>{authorDisplayName}</p>
          <p className='text-zinc-300'>{moment(publishedAt).locale('ru').fromNow()}</p>
        </div>
        <p className='text-sm mb-4 font-medium max-w-[600px]'>{textDisplay}</p>
        <div className='flex items-center'>
          <div className='flex mr-6'>
            <div className='flex mr-4 items-center'>
              <SlLike size={20} className='mr-2' />
              <p className='text-xs text-gray-400'>{likeCount < 1 ? '' : likeCount}</p>
            </div>
            <SlDislike size={20} />
          </div>
          <span className='text-xs font-medium'>Ответить</span>
        </div>
      </div>
    </div>
  )
}

export default Comment;