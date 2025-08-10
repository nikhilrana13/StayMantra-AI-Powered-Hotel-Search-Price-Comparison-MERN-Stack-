import SearchSection from '../Components/PageComponents/SearchSection';
import Navbar from '../Components/PageComponents/Navbar'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HowItWorks from '@/Components/PageComponents/HowItWorks';
import Testimonials from '@/Components/PageComponents/Testimonals';
import Footer from '@/Components/PageComponents/Footer';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full '>
      <Navbar />
      <section className='w-full'>
        {/* search section */}
         <SearchSection />
      </section>
      {/* how it works */}
      <section className='mt-10'>
         <HowItWorks onCTAClick={() => navigate('/hotel-search')} />
      </section>
      {/* testimonals */}
      <section>
        <Testimonials />
      </section>
      <Footer />

    </div>
  );
}

export default Home;
