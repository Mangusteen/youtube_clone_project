import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/common';
import 'moment/locale/ru';
import moment from "moment/min/moment-with-locales";
import numeral from 'numeral';
import 'numeral/locales/ru';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';


const Video = ({ video, id }) => {
  numeral.locale('ru');
  const navigate = useNavigate();

  const { snippet } = video;
  const { publishedAt, thumbnails, channelTitle, title, channelId } = snippet;
  const { high: { url } } = thumbnails;

  const [icon, setIcon] = useState('');

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
    <div className='flex flex-col cursor-pointer' onClick={() => navigate(`/watch/${id}`)}>
      <div className='relative'>
        <div className='block w-full rounded-lg object-cover mb-2 lazy-load-image-background'>
          <LazyLoadImage
            src={url}
            effect='opacity'
            className='w-full rounded-lg object-cover mb-2 h-[180px] md:h-[230px]'
          />
        </div>

        <span className='bg-black/50 absolute bottom-[12%] right-[4px] px-[3px] py-[2px] rounded-lg'>
          <p className='text-xs font-semibold z-[100] tracking-wide'>{videoDuration}</p>
        </span>
      </div>

      <div className='flex'>
        <div className='flex mr-4'>
          <div className='w-[40px] h-[40px] relative'>
            <LazyLoadImage
              src={icon}
              effect='opacity'
              className='rounded-full'
            />
          </div>
        </div>
        <div>
          <h1 className='font-semibold text-sm md:text-base mb-2'>{title}</h1>
          <p className='text-sm text-gray-300'>{channelTitle}</p>
          <div className='flex text-xs md:text-sm text-gray-300 flex-wrap'>
            <p className='mr-4 text-xs md:text-sm'>{viewCount > '1' ? viewCount + ' просмотров' : viewCount + ' просмотр'}</p>
            <p>{publishingTime.includes('день' || 'год' || 'месяц') ? '1 ' + publishingTime : publishingTime}</p>
          </div>
        </div>
      </div>

    </div >
  )
}

export default Video;

