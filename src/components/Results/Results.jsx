import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ResultItem from './ResultItem';
import SkeletonResult from '../UI/skeleton/SkeletonResult';

const Results = () => {
  const { queryList, token, loading } = useSelector((state) => state.search);
  console.log(queryList, token);

  useEffect(() => {
    if (!queryList) return;
  }, [queryList])

  return (
    <div className='p-10'>
      {!loading ? (queryList.map(({ etag, id, snippet }) =>
        <Link to={`/watch/${id.videoId}`} key={etag} className='cursor-pointer'>
          <ResultItem result={snippet} id={id.videoId} />
        </Link>
      )) : (
        [...Array(20)].map(() => {
          return <SkeletonResult />
        })
      )}
    </div>
  )
}


export default Results;