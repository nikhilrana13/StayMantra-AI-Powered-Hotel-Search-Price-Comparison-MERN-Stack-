import HotelCard from '@/Components/PageComponents/HotelCard';
import Navbar from '@/Components/PageComponents/Navbar';
import SearchSection from '@/Components/PageComponents/SearchSection';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import hotelimage from '.././assets/hotel.jpg';
import SkeletonHotelCard from '@/Components/PageComponents/SkeletonHotelCard';

const HotelSearch = () => {
  const location = useLocation()
  const [hotels,setHotels] = useState([])
  const [loading,setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(hotelimage);


      // fetch hotel images from unsplash
   const fetchDestinationimage = async(query)=>{
    if(!query) return 
                   try {
                       const res = await axios.get(`https://api.unsplash.com/search/photos`,{
                           params:{
                               query: query,
                               client_id :"k8m6vcE-nBKmHG9EeR9IrZw9zsNWdTNgEvI8uklqBTs"
                           }
           
                       })
                       setImageUrl(res.data.results[0]?.urls.regular || hotelimage)
                       
                   } catch (error) {
                       console.log("error fetching images",error);
                   }
               }
              //  console.log("imageurl",imageUrl)

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const destination = params.get("destination")
    const checkin = params.get("checkin")
    const checkout = params.get("checkout")
    const guests = params.get("guests")
    const rooms = params.get("rooms");

    if(destination){
      fetchHotels({destination,checkin,checkout,guests,rooms})
    }

  },[location.search])

  const fetchHotels = async(filters)=>{
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/search-hotel`,filters,{
        withCredentials:true
      })
      if(response.data){
        const hotelsData = response.data.data
          const hotelsWithImages = await Promise.all(
        hotelsData.map(async (hotel) => {
          const query = `${filters.destination} ${hotel.name}`;
          const image = await fetchDestinationimage(query);
          return { ...hotel, imageUrl: image };
        })
      );
       setHotels(hotelsWithImages)
      }
    } catch (error) {
      console.log("failed to fetch hotels",error)
    }finally{
      setLoading(false)
    }
  }
  // console.log("hotelsdata",hotels)


              
 
  return (
    <div>
        <Navbar />
        <SearchSection />
        {/* hotels data */}
        <div className='hotels w-full p-2 bg-[#F7F7F6]'>
           {
            loading ? (
               <p className='text-[1rem] items-center gap-2 flex font-[400] py-5 '>Searching for great deals <Loader2 className='animate-spin  w-4 h-4' /> </p>
            ):(
                <p className='text-[1rem] font-[400] py-5 '>We found <span className='font-[700]'>{hotels?.length || 0} </span>hotels from 100+ sites</p>
            )
           }

           {/* cards */}
           <div className='flex flex-col gap-5'>
               {
                loading ? (
                  [...Array(3)].map((_, index) => {
                  return (
                    <SkeletonHotelCard key={index} />
                  )
                })
                ):hotels.length > 0 ? (
                  hotels.map((hotel)=>{
                    return (
                      <HotelCard key={hotel._id} description={hotel?.description?.slice(0,80) + "..." || "No Description available"} image={imageUrl || hotelimage} name={hotel?.name} location={hotel?.address} rating={hotel?.rating} reviews={hotel?.total_reviews || hotel?.reviews} pricepernight={hotel?.price_per_night_inr ?? hotel?.price_per_night ?? hotel?.price ?? hotel?.price_per_night_usd } bookingdeals={hotel?.booking_deals || hotel?.bookingdeals} />
                    )
                  })
                ):(
                  <p className='text-center text-[1.3rem] font-[500]'>No hotels found</p>
                )
               }
              
           </div>
        </div>
      
    </div>
  );
}

export default HotelSearch;
