import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../utils/common';
import numeral from 'numeral';
import moment from "moment/min/moment-with-locales";
import 'numeral/locales/ru';
import 'moment/locale/ru';


const ResultItem = ({ result, id }) => {
  numeral.locale('ru');

  const { channelId, channelTitle, description, publishedAt, title, thumbnails } = result;


  const [icon, setIcon] = useState('');
  const [duration, setDuration] = useState('');
  const [viewAmount, setViewAmount] = useState('');
  const viewCount = numeral(viewAmount + ' ').format('0. a');

  const publishingTime = moment(publishedAt).locale('ru').fromNow();

  const time = moment.duration(duration).asSeconds();

  let videoDuration;
  if (time < 3600) {
    videoDuration = moment.utc(time * 1000).format('mm:ss');
  } else {
    videoDuration = moment.utc(time * 1000).format('hh:mm:ss');
  }


  const getChannelIcon = async () => {
    try {
      const result = await axios(`${BASE_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
      setIcon(result.data?.items[0].snippet.thumbnails.default.url)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChannelIcon(channelId);
  }, [channelId])

  const getVideosDetails = async () => {
    try {
      const res = await axios(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        , {
          headers: {
            "Accept": 'application/json',
            "X-Goog-Api-Key": import.meta.env.VITE_YOUTUBE_API_KEY
          }
        })
      setDuration(res.data.items[0]?.contentDetails.duration)
      setViewAmount(res.data.items[0]?.statistics.viewCount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideosDetails(id);
  }, [id])


  return (
    <div className='flex mb-8'>
      <div className='flex rounded-md mr-4 relative w-[500px] h-[280px]'>
        <img className='w-[500px] h-[280px] object-cover rounded-lg' src={thumbnails.high.url} alt="" />
        <span className='bg-black/65 absolute bottom-[8px] right-[8px] px-[3px] py-[2px] rounded-sm'>
          <p className='text-xs font-semibold z-[100] tracking-wide'>{videoDuration}</p>
        </span>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex flex-col mb-4'>
          <h1 className='text-xl font-semibold mb-2'>{title}</h1>
          <div className='flex text-sm text-gray-300'>
            <p className='mr-4'>{viewCount > '1' ? viewCount + ' просмотров' : viewCount + ' просмотр'}</p>
            <p>{publishingTime.includes('день' || 'год' || 'месяц') ? '1 ' + publishingTime : publishingTime}</p>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <div className='bg-white rounded-full w-[30px] h-[30px] mr-2'>
            <img className='rounded-full' src={icon} alt="" />
          </div>
          <div className='text-gray-300'>{channelTitle}</div>
        </div>
        <div className='text-gray-300 flex-wrap'>{description}</div>

      </div>
    </div>
  )
}

export default ResultItem;