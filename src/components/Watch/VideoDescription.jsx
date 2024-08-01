import React, { useEffect, useState } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import VideoText from './VideoText';
import { BASE_URL } from '../../utils/common';
import { useAuth } from '../../hook/use-auth';

import { updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { doc } from "firebase/firestore";

import 'numeral/locales/ru';
import SkeletonDescription from '../UI/skeleton/SkeletonDescription';
import { PiShareFatLight } from "react-icons/pi";
import { SlLike, SlDislike } from "react-icons/sl";

const VideoDescription = ({ video = {}, loading }) => {

  numeral.locale('ru');
  const [btnColor, setBtnColor] = useState('white');
  const [btnColorText, setBtnColorText] = useState('black');
  const [btnText, setBtnText] = useState('Подписаться');

  const { snippet = {}, statistics = {} } = video;
  const { likeCount, viewCount } = statistics;
  const { channelTitle, description, title, channelId, publishedAt } = snippet;


  const [channelDescription, setChannelDescription] = useState('');

  const [icon, setIcon] = useState('');
  const [channelSubscribers, setchannelSubscribers] = useState(0);
  const amountOfSubscribers = numeral(channelSubscribers + ' ').format('0. a') + ' ' + 'подписчиков';

  const getChannelInfo = async () => {
    try {
      const result = await axios(`${BASE_URL}/channels`, {
        params: {
          part: 'snippet,contentDetails,statistics',
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          id: channelId
        }
      })
      setChannelDescription(result.data?.items[0].snippet.description);
      setchannelSubscribers(result.data?.items[0].statistics.subscriberCount)
      setIcon(result.data?.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChannelInfo(channelId);
  }, [channelId])

  useEffect(() => {
    if (!video) return
  }, [video])


  const { email, userId } = useAuth();

  const channel_id = doc(db, 'subscriptions', `${email}`);

  const savedChannels = async () => {
    if (userId) {
      try {
        await updateDoc(channel_id, {
          channelsList: arrayUnion({
            channelId: channelId,
            icon: icon,
            title: channelTitle,
            subscribers: amountOfSubscribers,
            description: channelDescription
          })
        })
        setBtnColor('Red')
        setBtnColorText('white')
        setBtnText('Вы подписаны')
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <>{!loading ? (
      <div className='flex flex-col min-[992px]:mr-4 mb-4'>
        <div className='w-full'>
          <h1 className='text-base md:text-xl lg:text-2xl font-semibold mb-4'>{title}</h1>
        </div>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex'>
            <div className='flex items-center mr-2 xl:mr-8'>
              <div className='bg-white rounded-full w-[40px] h-[40px] mr-2 cursor-pointer'>
                <img className='rounded-full' src={icon} alt="" />
              </div>
              <div className='flex flex-col'>
                <div className='w-full'>
                  <h3 className='overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer max-[1024px]:w-[100px] max-[499px]:w-[70px]'>{channelTitle}</h3>
                </div>
                <div className='w-full'>
                  <p className='text-sm text-gray-300 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer max-[1024px]:w-[60px]'>{amountOfSubscribers} </p>
                </div>
              </div>
            </div>
            <button onClick={() => savedChannels(email)} className='text-black text-sm font-medium rounded-full px-4 py-[6px] cursor-pointer hover:bg-red-300' style={{ backgroundColor: btnColor, color: btnColorText }}>{btnText}</button>
          </div>
          <div className='flex'>
            <div className='bg-zinc-800 text-white text-sm font-medium rounded-full px-4 py-[4px] hidden items-center mr-2 md:mr-4 cursor-pointer min-[492px]:flex'>
              <SlLike className='mr-2 cursor-pointer' size={20} />
              <span className='pr-2 md:pr-4 font-bold text-xs md:text-sm hidden min-[499px]:block'>{numeral(likeCount + ' ').format('0. a')}</span>
              <span className='h-6 w-[0.5px] bg-white/30 mr-4'></span>
              <SlDislike size={20} />
            </div>
            <button className='bg-zinc-800 text-white text-sm font-medium rounded-full px-4 py-[10px] items-center lx:mr-4 cursor-pointer hidden min-[549px]:flex'>
              <PiShareFatLight className='xl:mr-2' size={24} />
              <span className=' hidden xl:block'>Поделиться</span>
            </button>
          </div>
        </div>
        <VideoText text={description} viewCount={viewCount} channelTitle={channelTitle} time={publishedAt} />
      </div>
    ) : (<SkeletonDescription />)}</>

  )
}

export default VideoDescription;