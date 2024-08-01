import React from 'react'
import { useParams } from 'react-router-dom'

const WatchSingleVideo = () => {

  const { id } = useParams();

  return (
    <div className='flex justify-center'>
      <div className='flex w-full flex-col min-[992px]:mr-4'>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}`}
          className='h-[70vh] mr-8 rounded-xl mb-2'>
        </iframe>
      </div>
    </div>
  )
}

export default WatchSingleVideo;