import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonRelatedVideos = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className='flex items-center mb-6'>
        <Skeleton className='w-[180px] h-[100px] mr-4 ' />
        <div className='flex flex-col w-[300px]'>
          <Skeleton className='w-full h-[12px]' />
          <Skeleton className='w-[80%] h-[12px]' />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonRelatedVideos;