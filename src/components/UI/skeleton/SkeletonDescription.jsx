import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonDescription = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className='flex flex-col w-full pr-4 py-4'>
          <Skeleton className='w-full h-[12px] mb-2' />
          <Skeleton className='w-[60%] h-[12px]' />
        </div>
        <div className='flex items-start'>
          <div className='flex items-center mb-6'>
            <Skeleton className='mr-4' circle height={60} width={60} />
            <div className='flex flex-col w-[200px] mr-28'>
              <Skeleton className='w-full h-[12px] mb-2' />
              <Skeleton className='w-[60%] h-[12px]' />
            </div>
          </div>
          <div className='mr-4'><Skeleton className='w-[150px] h-[40px] mb-2' /></div>
          <div className='flex'>
            <Skeleton className='w-[200px] h-[40px] mb-2 mr-4' />
            <Skeleton className='w-[50px] h-[40px] mb-2' />
          </div>
        </div>

      </SkeletonTheme>
    </div>
  )
}

export default SkeletonDescription;