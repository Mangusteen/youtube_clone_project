import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonResult = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className='flex items-center mb-6'>
        <Skeleton className='w-[500px] h-[280px] mr-4 ' />
        <div className='flex flex-col w-[500px]'>
          <Skeleton className='w-full h-[18px] mb-2' count={2} />
          <div className='flex mb-2 items-center'>
            <Skeleton className='mr-4' circle height={40} width={40} />
            <Skeleton className='w-[150px] h-[18px]' />
          </div>
          <Skeleton className='w-full h-[18px]' />
          <Skeleton className='w-[80%] h-[18px]' />
          <Skeleton className='w-[60%] h-[18px]' />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonResult;