import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import img1 from "../Assests/Images/01.png"
import { FaCalendarAlt } from 'react-icons/fa';

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Handle invalid date
    }
    // Subtract one day (24 hours in milliseconds)
    const previousDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    return previousDay.toLocaleDateString('en-GB', { weekday: 'long',day: '2-digit', month: 'short' }); // Format as "22 Mar"
};
const getPreviousDay = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Handle invalid date
    }
    // Subtract one day (24 hours in milliseconds)
    const previousDay = new Date(date.getTime() - 2*24 * 60 * 60 * 1000);
    return previousDay.toLocaleDateString('en-GB', { weekday: 'long',day: '2-digit', month: 'short' }); // Format as "22 Mar"
};
const getDayBeforeYesterday = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Handle invalid date
    }
    // Subtract two days (48 hours in milliseconds)
    const dayBeforeYesterday = new Date(date.getTime() - 3 * 24 * 60 * 60 * 1000);
    return dayBeforeYesterday.toLocaleDateString('en-GB', {weekday: 'long', day: '2-digit', month: 'short' }); // Format as "21 Mar"
};
const formatDateRange = (startDate, endDate) => {
    const options = { day: '2-digit', month: 'short' };
    return `${startDate.toLocaleDateString('en-GB', options)} - ${endDate.toLocaleDateString('en-GB', options)}`;
};
const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Adjust for Sunday or Monday start
    return new Date(start.setDate(start.getDate() + diff));
};
const getEndOfWeek = (date) => {
    const startOfWeek = getStartOfWeek(date);
    console.log(startOfWeek)
    return new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
};
const getStartOfLastWeek = (date) => {
    const startOfWeek = getStartOfWeek(date);
    return new Date(startOfWeek.setDate(startOfWeek.getDate() - 7));
};
const getEndOfLastWeek = (date) => {
    const startOfLastWeek = getStartOfLastWeek(date);
    return new Date(startOfLastWeek.setDate(startOfLastWeek.getDate() + 6));
};
const getStartOfLast7Days = (date) => {
    return new Date(date.setDate(date.getDate() - 6));
};
const getEndOfLast7Days = (date) => {
    return new Date();
};
const getStartOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};
const getEndOfMonth = (date) => {
    const startOfMonth = getStartOfMonth(date);
    return new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
};
const getStartOfLastMonth = (date) => {
    const startOfMonth = getStartOfMonth(date);
    return new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() - 1, 1);
};
const getEndOfLastMonth = (date) => {
    const startOfLastMonth = getStartOfLastMonth(date);
    return new Date(startOfLastMonth.getFullYear(), startOfLastMonth.getMonth() + 1, 0);
};
const getStartOfLast30Days = (date) => {
    return new Date(date.setDate(date.getDate() - 29)); // 30 days including today
};
const getEndOfLast30Days = (date) => {
    return date;
};

function DateRange(props) {
    const params = useParams();
    const [isVal , setIsVal] = useState(0)
    const [isDay , setIsDay] = useState(0)
    const [isWeek , setIsWeek] = useState(0)
    const [isMonth , setIsMonth] = useState(0)
    const [isYear , setIsYear] = useState(0)
    const timestamp = parseInt(params.id, 10); 
    const currentDate = formatDate(timestamp)
    const today = new Date(currentDate);

    const startOfWeek = getStartOfWeek(new Date(today));
    const endOfWeek = getEndOfWeek(new Date(today));
    const startOfLastWeek = getStartOfLastWeek(new Date(today));
    const endOfLastWeek = getEndOfLastWeek(new Date(today));
    const startOfLast7Days = getStartOfLast7Days(new Date(today));
    const endOfLast7Days = getEndOfLast7Days(new Date(today));

    const startOfMonth = getStartOfMonth(new Date(today));
    const endOfMonth = getEndOfMonth(new Date(today));
    const startOfLastMonth = getStartOfLastMonth(new Date(today));
    const endOfLastMonth = getEndOfLastMonth(new Date(today));
    const startOfLast30Days = getStartOfLast30Days(new Date(today));
    const endOfLast30Days = getEndOfLast30Days(new Date(today));
    

  return (
    <div className='max-w-sm mx-auto border border-white/20 min-h-screen'>
    <div className="bg-[#1A1A1A] pt-4 px-4 rounded-b-xl">
      <div className='flex justify-between items-center'>
      <Link to={'/'} className="text-base font-semibold flex gap-4">&#10005; <span> Date range</span></Link>
        <Link to={'/CustomRange'} className='text-[#FFBE00] font-semibold'>Save</Link>
      </div>
        <div className="mt-6 flex justify-between px-6 text-sm">
            <div className={('hover:border-b-2 hover:border-b-[#FFBE00] pb-2 cursor-pointer' , isVal === 0 ? "border-b-2 border-b-[#FFBE00] pb-2 cursor-pointer": "cursor-pointer")} onClick={() => setIsVal(0)} >Day</div>
            <div className={('hover:border-b-2 hover:border-b-[#FFBE00] pb-2 cursor-pointer' , isVal === 1 ? "border-b-2 border-b-[#FFBE00] pb-2 cursor-pointer": "cursor-pointer")} onClick={() => setIsVal(1)} >Week</div>
            <div className={('hover:border-b-2 hover:border-b-[#FFBE00] pb-2 cursor-pointer' , isVal === 2 ? "border-b-2 border-b-[#FFBE00] pb-2 cursor-pointer": "cursor-pointer")} onClick={() => setIsVal(2)} >Month</div>
            <div className={('hover:border-b-2 hover:border-b-[#FFBE00] pb-2 cursor-pointer' , isVal === 3 ? "border-b-2 border-b-[#FFBE00] pb-2 cursor-pointer": "cursor-pointer")} onClick={() => setIsVal(3)} >Other</div>

        </div>

    </div>
    {
    <div className='p-6'>
     {isVal === 0 && (
        <div className=''>
        <div className='flex items-center justify-between' onClick={() => setIsDay(0)}>
            <div className='grid group border-b-[#FFFFFF26] border-b-2 py-4 w-full'>
                <span className={('group-hover:text-[#FFBE00] text-sm', isDay === 0 ? "text-[#FFBE00]" : "")}>Today</span>
                <span className='text-xs text-[#FFFFFF99]'>{currentDate}</span>
            </div>
            {
                isDay === 0 &&
                <img src={img1} alt='No Preview' className='' />
            }
        </div>
        <div className='flex items-center justify-between' onClick={() => setIsDay(1)}>
            <div className='grid group border-b-[#FFFFFF26] border-b-2 py-4 w-full'>
                <span className={('group-hover:text-[#FFBE00] text-sm', isDay === 1 ? "text-[#FFBE00]" : "")}>Yesterday</span>
                <span className='text-xs text-[#FFFFFF99]'> {getPreviousDay(timestamp)}</span>
            </div>
            {
                isDay === 1 &&
                <img src={img1} alt='No Preview' className='' />
            }
        </div>
        <div className='flex items-center justify-between' onClick={() => setIsDay(2)}>
            <div className='grid group py-4'>
                <span className={('group-hover:text-[#FFBE00] text-sm', isDay === 2 ? "text-[#FFBE00]" : "")}>Day before yesterday</span>
                <span className='text-xs text-[#FFFFFF99]'>{getDayBeforeYesterday(timestamp)}</span>
            </div>
            {
                isDay === 2 &&
                <img src={img1} alt='No Preview' className='' />
            }

        </div>

      </div>
    )}
    {isVal === 1 && (
         <div className=''>

            <div className='flex items-center justify-between' onClick={() => setIsWeek(0)}>
                <div className='grid group border-b-[#FFFFFF26] border-b-2 py-4 w-full'>
                <span className={('group-hover:text-[#FFBE00] text-sm', isWeek === 0 ? "text-[#FFBE00]" : "")}>This week</span>
                <span className='text-xs text-[#FFFFFF99]'>{formatDateRange(startOfWeek, endOfWeek)}</span>
                </div>
                {
                    isWeek === 0 &&
                    <img src={img1} alt='No Preview' className='' />
                }
            </div>

         <div className='flex items-center justify-between' onClick={() => setIsWeek(1)}>
            <div className='grid group border-b-[#FFFFFF26] border-b-2 py-4 w-full'>
            <span className={('group-hover:text-[#FFBE00] text-sm', isWeek === 1 ? "text-[#FFBE00]" : "")}>Last week</span>
            <span className='text-xs text-[#FFFFFF99]'>{formatDateRange(startOfLastWeek, endOfLastWeek)}</span>
            </div>
            {
                isWeek === 1 &&
                <img src={img1} alt='No Preview' className='' />
            }
         </div>

         <div className='flex items-center justify-between' onClick={() => setIsWeek(2)}>
            <div className='grid group py-4'>
            <span className={('group-hover:text-[#FFBE00] text-sm', isWeek === 2 ? "text-[#FFBE00]" : "")}>Last 7 days</span>
            <span className='text-xs text-[#FFFFFF99]'>{formatDateRange(startOfLast7Days, endOfLast7Days)}</span>
            </div>
            {
                isWeek === 2 &&
                <img src={img1} alt='No Preview' className='' />
            }
         </div>
       </div>
    )}
    {isVal === 2 && (
        <div className=''>
        <div className='flex items-center justify-between' onClick={() => setIsMonth(0)}>
            <div className='grid group border-b-[#FFFFFF26] border-b-2 py-4 w-full'>
            <span className={('group-hover:text-[#FFBE00] text-sm', isMonth === 0 ? "text-[#FFBE00]" : "")}>This month</span>
            <span className='text-[#FFFFFF99] text-xs'>{formatDateRange(startOfMonth, endOfMonth)}</span>
            </div>
            {
                isMonth === 0 &&
                <img src={img1} alt='No Preview' className='' />
            }
        </div>
        <div className='flex items-center justify-between' onClick={() => setIsMonth(1)}>
        <div className='grid group border-b-[#FFFFFF26] border-b-2 py-4 w-full'>
          <span className={('group-hover:text-[#FFBE00] text-sm', isMonth === 1 ? "text-[#FFBE00]" : "")}>Last month</span>
          <span className='text-[#FFFFFF99] text-xs'>{formatDateRange(startOfLastMonth, endOfLastMonth)}</span>
        </div>
            {
                isMonth === 1 &&
                <img src={img1} alt='No Preview' className='' />
            }
        </div>
        <div className='flex items-center justify-between' onClick={() => setIsMonth(2)}>
        <div className='grid group py-4 w-full'>
          <span className={('group-hover:text-[#FFBE00] text-sm', isMonth === 2 ? "text-[#FFBE00]" : "")}>Last 30 days</span>
          <span className='text-[#FFFFFF99] text-xs'>{formatDateRange(startOfLast30Days, endOfLast30Days)}</span>
        </div>
            {
                isMonth === 2 &&
                <img src={img1} alt='No Preview' className='' />
            }
        </div>
      </div>
    )}
    {isVal === 3 && (
         <div className=''>
            <div className='flex items-center justify-between' onClick={() => setIsYear(0)}>
            <div className='grid group border-b-[#FFFFFF26] border-b-2 py-4 w-full'>
                <span className={('group-hover:text-[#FFBE00] text-sm', isYear === 0 ? "text-[#FFBE00]" : "")}>This year</span>
                <span className='text-[#FFFFFF99] text-xs'>Jan 1 - Apr 20</span>
            </div>
            {
                isYear === 0 &&
                <img src={img1} alt='No Preview' className='' />
            }
            </div>
        <div className='flex items-center justify-between' onClick={() => setIsYear(1)}>
            <div className='grid group border-b-[#FFFFFF26] border-b-2 py-4 w-full'>
            <span className={('group-hover:text-[#FFBE00] text-sm', isYear === 1 ? "text-[#FFBE00]" : "")}>Previous year</span>
            <span className='text-[#FFFFFF99] text-xs'>Jan 1’ 2023 - Dec 20’ 2023</span>
            </div>
            {
                isYear === 1 &&
                <img src={img1} alt='No Preview' className='' />
            }
        </div>
         <div className='flex items-center justify-between' onClick={() => setIsYear(2)}>
            <div className='grid group py-4 w-full border-b-[#FFFFFF26] border-b-2'>
            <span className={('group-hover:text-[#FFBE00] text-sm', isYear === 2 ? "text-[#FFBE00]" : "")}>Lifetime</span>
            <span className='text-[#FFFFFF99] text-xs'>Apr 5’ 2022 - Apr 20’ 2024</span>
            </div>
            {
                isYear === 2 &&
                <img src={img1} alt='No Preview' className='' />
            }
         </div>
         <div className='flex items-center justify-between py-4' onClick={() => setIsYear(3)}>
            <div className={('group-hover:text-[#FFBE00] text-sm cursor-pointer', isYear === 3 ? "text-[#FFBE00]" : "")}>Custom</div>
            {
                isYear === 3 &&
                <img src={img1} alt='No Preview' className='' />
            }

         </div>
         {
            isYear === 3 && 
            <div className='grid grid-cols-2 gap-6'>
               <label className='border-2 border-[#4a4a4a] text-[#9B9B9B] h-full w-full p-2 rounded-xl items-center flex'>
               <FaCalendarAlt className='text-[#9B9B9B] text-xl' />
                <div className=''>
                    <div>Start date</div>
                    <input type='date' className='bg-transparent outline-none'  />
                </div>
               </label>
               <label className='border-2 border-[#4a4a4a] text-[#9B9B9B] h-full w-full p-2 rounded-xl'>
                   <div>End date</div>
                   <input type='date' className='bg-transparent outline-none' />
               </label>
            </div>
         }
       </div>
      )}
    </div>
    }
    
  </div>
  )
}

export default DateRange
