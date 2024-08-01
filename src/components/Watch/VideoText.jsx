import React, { useState } from 'react';
import { truncStr } from '../../utils/common';
import numeral from 'numeral';
import 'numeral/locales/ru';
import 'moment/locale/ru';
import moment from "moment/min/moment-with-locales";


const VideoText = ({ text, viewCount, channelTitle, time }) => {
  numeral.locale('ru');

  const publishingTime = moment(time).locale('ru').fromNow();


  const [fullText, setFullText] = useState(false);

  const showFullText = () => {
    setFullText(!fullText)
  }

  return (
    <div className='bg-zinc-800 p-4 rounded-lg flex flex-col cursor-pointer'>
      <div className='flex'>
        <div className='mr-2'>{numeral(viewCount + ' ').format('0. a')}просмотров</div>
        <div className='mr-2'>{publishingTime}</div>
        <p className='text-gray-300 cursor-pointer'>{channelTitle}</p>
      </div>
      <div className='cursor-pointer'>
        {fullText ? <p>{text}</p> : (truncStr(text, 150))}
        {fullText ? (<button className='font-semibold' onClick={showFullText}>Cвернуть </button>)
          : (<button className='font-semibold' onClick={showFullText}>...еще</button>)}
      </div>
    </div>

  )
}

export default VideoText;