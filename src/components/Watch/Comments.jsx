import React, { useState } from 'react'
import Comment from './Comment';
import SkeletonComment from '../UI/skeleton/SkeletonComment';


const Comments = ({ comments, id, isLoading }) => {
  const [value, setValue] = useState('сначала популярные');


  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (value === 'сначала популярные') {
      return b?.snippet.topLevelComment.snippet.likeCount - a?.snippet.topLevelComment.snippet.likeCount;
    } else if (value === 'сначала новые') {
      return b?.snippet.topLevelComment.snippet.publishedAt - a?.snippet.topLevelComment.snippet.publishedAt;
    } else {
      return comments;
    }
  })

  return (
    <div className='flex flex-col'>
      <div className='flex items-center mb-6'>
        <div className='mr-2 font-bold text-sm min-[425px]:text-lg w-[200px] min-[425px]:w-[300px]'>{comments.length} комментариев</div>
        <div className='text-black w-full h-full'>
          <select
            value={value}
            onChange={handleChange}
            className='text-white bg-zinc-800 w-[150px] min-[425px]:w-[200px] h-full rounded-lg font-semibold p-2' id="">
            <option name="упорядочить" value="">Упорядочить</option>
            <option
              name="сначала популярные"
              value="сначала популярные"
            >Cначала популярные</option>
            <option name="сначала новые" value="сначала новые">Cначала новые</option>
          </select>
        </div>
      </div>
      <div className='flex flex-col'>
        {!isLoading ? (sortedComments.map(({ snippet, id }) => {
          const { topLevelComment } = snippet;
          return (
            <Comment content={topLevelComment} length={sortedComments.length} />
          )
        }
        )) : (
          [...Array(20)].map(() => {
            return <SkeletonComment />
          })
        )}
      </div>
    </div >
  )
}

export default Comments;