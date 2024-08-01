import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonComment = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className='flex items-center mb-6'>
        <Skeleton className='mr-4' circle height={60} width={60} />
        <div className='flex flex-col w-[500px]'>
          <Skeleton className='w-full h-[12px] mb-2' />
          <Skeleton className='w-[60%] h-[12px]' />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonComment;