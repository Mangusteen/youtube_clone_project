import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getVideo, getVideos } from '../store/videosSlice';
import { getCommentsByVideoId } from '../store/commentsSlice';
import RelatedVideos from '../components/Watch/RelatedVideos';
import VideoDescription from '../components/Watch/VideoDescription';
import WatchSingleVideo from '../components/Watch/WatchSingleVideo';
import Comments from '../components/Watch/Comments';


const WatchPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { videos, video, loading, error } = useSelector((state) => state.videos);
  const { comments, isLoading } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getVideo(id));
    dispatch(getCommentsByVideoId(id));
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch])


  return (
    <>
      <div className='pr-18 pl-4 lg:pl-20 py-4 lg:py-6 flex flex-col min-[992px]:flex-row w-full'>
        <div className='flex flex-col w-full min-[992px]:w-[70%]'>
          <WatchSingleVideo />
          {error && <h1 className='text-white'>Error</h1>}
          {loading ? <h1 className='text-white'>Loading</h1> : <VideoDescription video={video} id={id} loading={loading} />}
          <Comments comments={comments} id={id} isLoading={isLoading} />
        </div>
        <div className=' block min-[992px]:hidden h-[1px] w-full bg-zinc-600/50 mb-6'></div>
        <RelatedVideos related={videos} loading={loading} error={error} />
      </div>
    </>
  )
}

export default WatchPage;