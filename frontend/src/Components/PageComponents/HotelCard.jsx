import React from 'react';
import { NavLink } from 'react-router-dom';
import hotelimage from '.././../assets/hotel.jpg'
import { Heart } from 'lucide-react';


const HotelCard = ({ image, location, name, pricepernight, rating, reviews, description, bookingdeals }) => {

    // Normalize bookingdeals to always be an array
    let dealsArray = [];
    if (Array.isArray(bookingdeals)) {
        dealsArray = bookingdeals;
    } else if (bookingdeals && typeof bookingdeals === 'object') {
        dealsArray = Object.keys(bookingdeals).map(siteName => ({
            site: siteName,
            ...bookingdeals[siteName]
        }));
    }
    return (
        <div className='flex w-full flex-col p-2 rounded-md  bg-white gap-3  md:flex-row '>
            <div className='md:w-[300px] w-full md:h-[200px]'>
                <img src={image || hotelimage} alt="image" className='w-full rounded-md h-full object-center' />
            </div>
            <div className='flex w-full p-3 md:w-[40%] flex-col gap-2'>
                <h3 className='font-[500]'>{name || "NA"}</h3>
                <span>{description || "NA"}</span>
                <span>{location || "NA"}</span>
                <div className='flex gap-2  items-center'>
                    <span className='px-2 text-[0.7] bg-green-700 text-white rounded-md'>{reviews || "NA"}</span>
                    <span className='font-[500]'>Excellent ({rating}) ratings</span>
                </div>
                <div className='flex items-center cursor-pointer rounded-md gap-2 border p-2'>
                    <span><Heart /></span>
                    <span>Add to favourites</span>
                </div>

            </div>
            <div className='flex flex-col w-full md:w-[30%] p-3 gap-2'>
                <div className='flex rounded-md border p-2 flex-col'>
                    <span className='font-[500]'>₹{pricepernight || 0}</span>
                    <span className='font-[400]'>price per night</span>
                </div>
                <div className='flex flex-col border rounded-md p-3 gap-2'>
                    {/* {bookingdeals &&
                        Object.entries(bookingdeals).map(([site, data], index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <span className='font-[500]'>₹{data?.price_inr || data?.price}</span>
                                <NavLink
                                    to={`/redirect?site=${encodeURIComponent(site)}&link=${encodeURIComponent(data?.link)}`}
                                    className="text-green-800"
                                >
                                    {site || "NA"}
                                </NavLink>
                            </div>
                        ))
                    } */}
                      {dealsArray.map((deal, index) => (
                        <div key={index} className='flex gap-2 items-center'>
                            <span className='font-[500]'>₹{deal?.price_inr || deal?.price}</span>
                            <NavLink
                                to={`/redirect?site=${encodeURIComponent(deal.site)}&link=${encodeURIComponent(deal?.link)}`}
                                className="text-green-800"
                            >
                                {deal.site || "NA"}
                            </NavLink>
                        </div>
                    ))}
                   
                   </div>

                </div>
            </div>
    );
}

export default HotelCard;
