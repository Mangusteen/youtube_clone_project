import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonSingleVideo = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className='flex'>
          <Skeleton className='w-full h-full' />
        </div>
      </SkeletonTheme></div>
  )
}

export default SkeletonSingleVideo;