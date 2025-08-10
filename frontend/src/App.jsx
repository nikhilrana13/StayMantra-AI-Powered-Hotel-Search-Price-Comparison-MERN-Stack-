import React from 'react';
import Home from './Pages/Home';
import { Route,Routes, useLocation } from 'react-router-dom';
import HotelSearch from './Pages/HotelSearch';
import RedirectPage from './Components/PageComponents/RedirectPage';

const App = () => {
  const location = useLocation()
  return (
    <div className={`app ${location.pathname === '/' ? 'bg-[#F7F7F6]':'bg-white'}`} >
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[18vw]'>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotel-search' element={<HotelSearch />} />
        <Route path='/redirect' element={<RedirectPage />} />
      </Routes>
      </div>
     
    </div>
  );
}

export default App;
