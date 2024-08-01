import React, { useEffect, useState } from 'react';
import { useAuth } from '../hook/use-auth';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/routes';

import { updateDoc, doc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { IoIosClose } from "react-icons/io";



const Subscription = () => {
  const { email } = useAuth();

  const [channels, setChannels] = useState([]);
  const channelRef = doc(db, 'subscriptions', `${email}`);

  const deleteMovies = async (id) => {
    try {
      const result = channels.filter((item) => item.id !== id);
      await updateDoc(channelRef, {
        channelsList: result
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return onSnapshot(collection(db, 'subscriptions'), (snapshot) => {
      setChannels(snapshot.docs.map(doc => doc.data().channelsList).flat())
    })
  }, [])

  return (
    <>
      {!channels || !channels.length ?
        <div className='flex flex-col p-10'>
          <h1 className='text-white text-xl font-semibold mb-6'>Sorry, no channels here! You did not add any video yet</h1>
          <Link to={ROUTES.HOME} >
            <button className='bg-red-600 te p-4 font-semibold rounded-sm'>Return back</button>
          </Link>
        </div> :
        <div className='flex flex-col'>
          {channels.map((channel) =>
            <div className='flex w-full mb-8 relative p-10' key={channel.id}>
              <div className='mr-4 rounded-full w-[180px]'>
                <img className='rounded-full w-full' src={channel.icon} alt="" />
              </div>
              <div className='flex flex-col'>
                <h1 className='text-lg font-semibold mb-2'>{channel.title}</h1>
                <div className='flex flex-col'>
                  <p className='text-gray-300'>{channel.description}</p>
                  <p className='text-gray-300'>
                    {channel.subscribers}
                  </p>
                </div>
              </div>
              <div onClick={() => deleteMovies(channel.id)} className='absolute right-[10px] cursor-pointer'><IoIosClose size={30} /></div>
            </div>)}
        </div >

      }
    </>
  )
}


export default Subscription;