// Components/SkeletonHotelCard.jsx
const SkeletonHotelCard = () => {
  return (
    <div className='flex w-full flex-col p-2 rounded-md bg-white gap-3 md:flex-row'>
      {/* Image skeleton */}
      <div className='md:w-[300px] w-full md:h-[200px] shimmer rounded-md'></div>

      {/* Middle section skeleton */}
      <div className='flex w-full p-3 md:w-[40%] flex-col gap-2'>
        <div className='w-2/3 h-5 shimmer rounded'></div>
        <div className='w-full h-4 shimmer rounded'></div>
        <div className='w-1/2 h-4 shimmer rounded'></div>
        <div className='flex gap-2 items-center mt-2'>
          <div className='w-8 h-5 shimmer rounded'></div>
          <div className='w-24 h-4 shimmer rounded'></div>
        </div>
      </div>

      {/* Price + booking deals skeleton */}
      <div className='flex flex-col w-full md:w-[30%] p-3 gap-2'>
        <div className='flex rounded-md border p-2 flex-col gap-2'>
          <div className='w-16 h-5 shimmer rounded'></div>
          <div className='w-20 h-4 shimmer rounded'></div>
        </div>
        <div className='flex flex-col border rounded-md p-3 gap-2'>
          {[1, 2].map((_, i) => (
            <div className='flex gap-2 items-center' key={i}>
              <div className='w-16 h-5 shimmer rounded'></div>
              <div className='w-20 h-4 shimmer rounded'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonHotelCard;
