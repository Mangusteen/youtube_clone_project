import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonVideo = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className='flex flex-col'>
        <Skeleton className='w-full h-[200px] mb-2' />
        <div className='flex'>
          <Skeleton className='w-[300px] mr-4' circle height={50} width={50} />
          <Skeleton className='w-[250px] h-[18px]' count={2} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonVideo;