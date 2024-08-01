import React from 'react'
import Header from './components/Header'
import AppRoutes from './Routes/AppRoutes'
import ModalSidebar from './components/UI/ModalSidebar'

const App = () => {
  return (
    <>
      <Header />
      <ModalSidebar />
      <div className='w-full h-full flex mx-0 flex-auto px-4 pb-4'>
        <AppRoutes />
      </div>
    </>
  )
}

export default App;