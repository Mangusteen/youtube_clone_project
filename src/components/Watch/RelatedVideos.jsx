import React from 'react'
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import 'numeral/locales/ru';
import 'moment/locale/ru';
import moment from "moment/min/moment-with-locales";
import SkeletonRelatedVideos from '../UI/skeleton/SkeletonRelatedVideos';
import { truncStr } from '../../utils/common';

const RelatedVideos = ({ related, loading }) => {
  numeral.locale('ru');

  return (
    <div className='flex flex-col w-[350px] min-[425px]:w-[450px] min-[992px]:w-[400px] 2xl:w-[500px]'>
      {!loading ? (related.map(({ snippet, statistics, id }) =>
        <Link className='mb-2' to={`/watch/${id}`}>
          <div className='grid grid-cols-2 gap-2 lg:gap-4'>
            <div className='w-full h-full mr-4 lg:mr-6'>
              <img className='object-cover rounded-md' src={snippet.thumbnails.medium.url} alt="" />
            </div>
            <div className='flex flex-col'>
              <div className='w-full'>
                <h3 className='font-semibold text-xs lg:text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap'>{snippet.title}</h3>
              </div>
              <h3 className='text-gray-300 text-xs'>{snippet.channelTitle}</h3>
              <div className='flex text-gray-300 text-xs'>
                <p className='mr-4'>{numeral(statistics.viewCount + ' ').format('0. a')}</p>
                <p className='block min-[992px]:hidden lg:block'>{moment(snippet.publishedAt).locale('ru').fromNow()}</p>
              </div>
            </div>
          </div>
        </Link>
      )) : (
        [...Array(20)].map(() => {
          return <SkeletonRelatedVideos />
        })
      )
      }
    </div >
  )
}

export default RelatedVideos;