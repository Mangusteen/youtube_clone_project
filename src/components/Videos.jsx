import React, { useEffect } from 'react'
import Video from './Video';
import SkeletonVideo from './UI/skeleton/SkeletonVideo';

const Videos = ({ videos, loading }) => {

  useEffect(() => {
    if (!videos) return;
  }, [videos])

  return (
    <div className='grid grid-cols-1 min-[549px]:grid-cols-2 gap-x-4
    gap-y-10 md:gap-y-14 lg:grid-cols-3 min-[1440px]:grid-cols-4 mx-4'>
      {!loading ? (videos.map((video) => {
        const id = typeof video.id === 'string' ? video.id : video.id.videoId;
        return (
          <>
            <Video video={video} id={id} key={id} />
          </>
        )
      }
      )) : [...Array(20)].map(() => {
        return <SkeletonVideo />
      })}

    </div>
  )
}

export default Videos;
