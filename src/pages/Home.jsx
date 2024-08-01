import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { useAuth } from '../hook/use-auth';
import Sidebar from '../components/Sidebar';
import Videos from '../components/Videos';
import Categories from '../components/Categories';
import { getVideos } from '../store/videosSlice';
import { getVideosByCategory } from '../store/categorySlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const { videos, nextPageToken, isLoading } = useSelector((state) => state.videos);

  const { categoryList, pageToken, activeCategory, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    if (!categoryList || !categoryList.length || isAuth) dispatch(getVideos());
  }, [dispatch, categoryList])

  const fetchData = () => {
    if (!categoryList || !categoryList.length) {
      dispatch(getVideos(nextPageToken));
    } else {
      dispatch(getVideosByCategory(activeCategory, pageToken));
    }
  }
  useEffect(() => {
    if (!videos || !categoryList) return;
  }, [videos, categoryList])

  return isAuth ? (
    <>
      <Sidebar />
      <div className='w-full h-full'>
        <div className='flex flex-col items-center mb-4'>
          <Categories />
          {!categoryList.length || !categoryList ? (
            <InfiniteScroll
              dataLength={videos.length}
              next={fetchData}
              hasMore={true}
              loader={<h1>Loading...</h1>}
            >
              <Videos videos={videos} loading={isLoading} />
            </InfiniteScroll>)
            : (
              <InfiniteScroll
                dataLength={categoryList.length}
                next={fetchData}
                hasMore={true}
                loader={<h1>Loading...</h1>}
              ><Videos videos={categoryList} loading={loading} />
              </InfiniteScroll>
            )}
        </div>
      </div>
    </>

  ) : (<Routes>
    <Route path='*' element={<Navigate to={ROUTES.LOGIN} replace />} />
  </Routes>)
}

export default Home;