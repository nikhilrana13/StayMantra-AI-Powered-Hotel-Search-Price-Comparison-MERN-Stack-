import { Calendar1Icon, Search, Users2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Booking from '../../assets/bookingcom.png';
import hotelscom from '../../assets/hotelscom.avif';
import maketrip from '../../assets/makemytrip.avif';
import oyo from '../../assets/oyo.avif';
import tripcom from '../../assets/tripcom.avif';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SearchSection = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false)
    const [guests, setguests] = useState(2)
    const [rooms, setrooms] = useState(1)
    const locationhook = useLocation()
    const navigate = useNavigate()
    const {register,handleSubmit,setValue,formState: { errors },} = useForm();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim().length > 2 && !isSelected) {
                fetchLocations();
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query, isSelected]);

    const fetchLocations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?city=${query}&format=json`
            );
            setSuggestions(response.data || []);
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setIsSelected(false) // Reset selection when typing
    };

    const handleSelect = (item) => {
        setQuery(item.display_name);
        setSuggestions([]); // Hide suggestion list
        setIsSelected(true); // Prevent further API calls
    };

    // Close Dropdown When Clicked Outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.guest-dropdown-wrapper')) {
                setShowGuestDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(()=>{
        const params = new URLSearchParams(locationhook.search)
        if(params.get("destination")){
            setQuery(params.get("destination"))
            setIsSelected(true); // Prevent No results found popup
        }
         if(params.get("guests")) setguests(params.get("guests"))
        if(params.get("rooms")) setrooms(params.get("rooms"))
       if(params.get("checkin")){
        setValue("checkin",params.get("checkin"))
       } 
       if(params.get("checkout")){
        setValue("checkout",params.get("checkout"))
       }
    },[locationhook.search,setValue])


    const handleSearch = async(data)=>{
        const searchParams = new URLSearchParams({
            destination:query,
            checkin:data.checkin,
            checkout:data.checkout,
            guests:guests,
            rooms:rooms
        }).toString()
        navigate(`/hotel-search?${searchParams}`)
    }

    return (
        <div className="flex flex-col py-7 gap-8">
            {
            location.pathname === '/' ?       <div className="flex flex-col gap-2">
                <p className="text-[1.2rem] sm:text-[1.6rem] font-[700]">Save up to 55% on your next hotel stay</p>
                <p className="text-sm font-[500]">We compare hotel prices from over 100 sites</p>
            </div>:""
            }
            {/* Search Bar */}
            <form onSubmit={handleSubmit(handleSearch)}>
                <div className="flex flex-col justify-evenly gap-4 lg:gap-0 lg:items-center lg:flex-row shadow-lg bg-[#ffffff] rounded-md">
                    {/* Input */}
                    <div className="relative w-full lg:w-[300px]">
                        <div className="flex items-center border-b lg:border-none gap-2 px-2 py-2 lg:py-0 md:flex-row">
                            <Search />
                            <input
                                type="text"
                                placeholder="Search places"
                                className="px-3 py-2 w-full outline-none"
                                value={query}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Suggestions Dropdown */}
                        {query.trim().length > 2 && !isSelected && (
                            <ul className="absolute top-full left-0 bg-white z-10 w-full max-h-40 overflow-y-hidden border rounded-md shadow">
                                {loading ? (
                                    <li className="p-2 text-gray-500 italic">Searching...</li>
                                ) : suggestions.length > 0 ? (
                                    suggestions.map((item, i) => (
                                        <li
                                            key={i}
                                            onClick={() => handleSelect(item)}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {item.display_name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 text-gray-500 italic">No results found</li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Other Inputs */}
                    <div className="w-px h-8 hidden lg:block bg-gray-300 mx-2" />
                    <div className="flex items-center border-b lg:border-none gap-3 px-2 py-2 lg:py-0 md:flex-row">
                        <div className="flex px-2 hover:bg-[#F7F7F6] rounded-md cursor-pointer py-2 items-center gap-2">
                            <Calendar1Icon />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-500">Check in</span>
                                <input
                                    id='checkin'
                                    type='date'
                                    className='w-28 text-sm cursor-pointer font-bold outline-none border-none  hover:bg-transparent'
                                    {...register('checkin',{required:true})}
                                />
                            </div>
                        </div>
                        <div className="w-px h-8 hidden lg:block bg-gray-300 mx-2" />
                        <div className="flex hover:bg-[#F7F7F6] rounded-md py-2 cursor-pointer items-center px-2 gap-2">
                            <Calendar1Icon />
                            <div className="flex flex-col ">
                                <span className="text-sm  text-gray-500">Check Out</span>
                                <input
                                    id='checkout'
                                    type='date'
                                    className='w-28 cursor-pointer text-sm font-bold outline-none border-none  hover:bg-transparent'
                                    {...register('checkout',{required:true})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="w-px h-8 hidden lg:block bg-gray-300 mx-2" />
                    <div className="relative guest-dropdown-wrapper flex flex-col lg:flex-row lg:items-center gap-5 px-2">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setShowGuestDropdown((prev) => !prev)}
                        >
                            <Users2 />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-500">Guests and rooms</span>
                                <div className="text-sm min-w-[120px] font-bold">
                                    {guests} Guests, {rooms} Room{rooms > 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>
                        <Button type="submit">Search</Button>

                        {showGuestDropdown && (
                            <div className="absolute top-14 left-0 z-10 bg-white shadow-md border rounded-md p-4 w-52">
                                {/* Guests */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-semibold">Guests</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="w-6 h-6 bg-gray-200 rounded text-black font-bold"
                                            onClick={() => setguests((prev) => Math.max(prev - 1, 1))}
                                        >
                                            -
                                        </button>
                                        <span>{guests}</span>
                                        <button
                                            type="button"
                                            className="w-6 h-6 bg-gray-200 rounded text-black font-bold"
                                            onClick={() => setguests((prev) => prev + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Rooms */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold">Rooms</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="w-6 h-6 bg-gray-200 rounded text-black font-bold"
                                            onClick={() => setrooms((prev) => Math.max(prev - 1, 1))}
                                        >
                                            -
                                        </button>
                                        <span>{rooms}</span>
                                        <button
                                            type="button"
                                            className="w-6 h-6 bg-gray-200 rounded text-black font-bold"
                                            onClick={() => setrooms((prev) => prev + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </form>

            {/* Booking Sites */}
            {
                location.pathname === '/' ?  <div>
                <ul className="flex justify-between items-center list-none">
                    {[Booking, maketrip, hotelscom, oyo, tripcom].map((img, i) => {
                        const scaledImages = [oyo, tripcom];
                        const isScaled = scaledImages.includes(img);
                        return (
                            <li key={i} className="flex items-center justify-center w-24 h-14 p-2">
                                <img
                                    src={img}
                                    alt="logo"
                                    className={`h-full w-full object-contain ${isScaled ? 'scale-90' : ''}`}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div> : ""
            }
        </div>
    );
};

export default SearchSection;