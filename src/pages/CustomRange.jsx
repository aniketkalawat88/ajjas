import React, { useState } from 'react'
import { DummyData } from '../dummydata/page'
// import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { GiPathDistance } from "react-icons/gi";
import { TbBrandSpeedtest, TbArrowZigZag } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import { SiFueler } from "react-icons/si";
import { AiOutlineDollarCircle } from "react-icons/ai";

const formattedDate = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0];
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
      return 'Invalid Date';
  }
  return date.toLocaleDateString('en-GB', { month: 'short', day: '2-digit' });
};

const convertDistance = (meters) => {
  return (meters / 1000).toFixed(2); 
};

const convertSecondsToTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemaining = seconds % 60;
  
  return <div>{hours}<span className='text-sm'>h</span> {minutes}<span className='text-sm'>m</span> {secondsRemaining}<span className='text-sm'>s</span></div>;
};

function Home() {
    const startDate = '2024-03-01';
    const endDate = '2024-03-07';
    
    const [currentDate, setCurrentDate] = useState(startDate);

    // Filter data within the specified date range
    const filteredData = DummyData.value.filter(item => {
        const itemDate = formattedDate(item.startDate);
        return itemDate >= startDate && itemDate <= endDate;
    });

    // Calculate total values for the filtered data
    const totalValues = filteredData.reduce((acc, curr) => {
        acc.totalDistance += curr.distance || 0;
        acc.totalDuration += curr.duration || 0;
        acc.totalAverageSpeed += curr.averageSpeed || 0;
        acc.totalTopSpeed += curr.topSpeed || 0;
        acc.totalFuelConsumed += 3.01;  // Assuming fixed fuel consumption for simplicity
        acc.totalFuelCost += (convertDistance(curr.distance) / 3); // Example formula for fuel cost
        return acc;
    }, {
        totalDistance: 0,
        totalDuration: 0,
        totalAverageSpeed: 0,
        totalTopSpeed: 0,
        totalFuelConsumed: 0,
        totalFuelCost: 0,
    });

    return (
        <div className='bg-black min-h-screen'>
            <div className="bg-black text-white max-w-sm mx-auto pb-10 border border-white/20">
                <div className="bg-[#1A1A1A] p-4 rounded-b-xl">
                    <h1 className="text-base font-semibold">Statistics</h1>
                    <div className="mt-6 flex justify-between text-[#9B9B9B] items-center">
                        <div className="text-xs flex items-center gap-2">
                            <FaCalendarAlt />{formatDate(currentDate)} - {formatDate(endDate)}
                        </div>
                        <div className="flex gap-6">
                            <span onClick={() => setCurrentDate(startDate)} className='cursor-pointer p-2 hover:text-white/35'>
                                <FaChevronLeft />
                            </span>
                            <span onClick={() => setCurrentDate(endDate)} className='cursor-pointer p-2 hover:text-white/35'>
                                <FaChevronRight />
                            </span>
                        </div>
                    </div>
                </div>
            <div className='px-4'>
                
          <div className="bg-[#1A1A1A] p-4 my-6 rounded-xl">
            <div className="flex justify-between">
              <h1 className="font-semibold text-sm">Riding Behaviour</h1>
              <GoArrowRight />
            </div>
            <div className="bg-[#222222] p-2 border border-[#C6C6C600] rounded-xl mt-2">
              <div className="flex items-center text-sm gap-4">
                <div className="font-semibold flex items-center gap-3 border border-[#259DFE] rounded-md"> 
                  <span className="bg-[#259DFE] p-1 px-2 h-full flex items-center justify-center text-xs">91%</span>
                  <span className="p-1 text-xs">Excellent</span>
                </div>
                <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
              </div>
            </div>
          </div>
                <div className="bg-[#1A1A1A] p-6 my-6 rounded-xl">
            <div className="flex justify-between">
              <h1 className="font-semibold text-[#F3F3F3] text-sm">Journey </h1>
               <GoArrowRight />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="mt-4 border-r border-r-[#FFFFFF66]">
                <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1" ><GiPathDistance className='bg-[#6EDDC9]/30 text-xl rounded-full p-1 text-[#6EDDC9]' /> Distance Travelled</div>
                <div className="text-2xl font-semibold  mt-3 mb-1">{convertDistance(totalValues.totalDistance)} <span className='text-sm'>km</span></div>
                
                <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
              </div>
              
              <div className="mt-4 ">
                <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1"><FaRegClock className='bg-[#00A8E2]/30 text-xl rounded-full p-1 text-[#6EDDC9]'  />Time Duration</div>
                <div className="text-2xl font-semibold  mt-3 mb-1">{convertSecondsToTime(totalValues.totalDuration)}</div>
                
                <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
              </div>


              </div>
                </div>
                
                <div className="bg-[#1A1A1A] p-6 my-6 rounded-xl">
                    <div className="flex justify-between">
                    <h1 className="font-semibold text-[#F3F3F3]">Speed </h1>
                    <GoArrowRight />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                    <div className="mt-4 border-r border-r-[#FFFFFF66]">
                        <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1" ><IoMdSpeedometer className='bg-[#AC630D]/30 text-xl rounded-full p-1 text-[#AC630D]' />Average Speed</div>
                        <div className="text-2xl font-semibold  mt-3 mb-1">{totalValues.totalAverageSpeed ? parseFloat(totalValues.totalAverageSpeed.toFixed(2)) : 0}<span className='text-sm'> km/hr</span></div>
                        
                        <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
                    </div>
                    
                    <div className="mt-4 ">
                        <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1"><TbBrandSpeedtest className='bg-[#E2B519]/30 text-xl rounded-full p-1 text-[#E2B519]' />Top Speed</div>
                        <div className="text-2xl font-semibold  mt-3 mb-1">{totalValues.totalTopSpeed ? parseFloat(totalValues.totalTopSpeed.toFixed(2)) : 0}<span className='text-sm'> km/hr</span></div>
                        <p className="text-[10px]"> <span className="text-[#5FA04F]">24%</span> vs preceding period </p>
                    </div>


                    </div>
                </div>
                
                <div className="bg-[#1A1A1A] p-6 my-6 rounded-xl">
                    <div className="flex justify-between">
                    <h1 className="font-semibold text-[#F3F3F3]">Fuel </h1>
                    <GoArrowRight />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                    <div className="mt-4 border-r border-r-[#FFFFFF66]">
                        <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1" ><SiFueler className='bg-[#B3DD6E]/30 text-xl rounded-full p-1 text-[#DADADA]' /> Fuel Consumed</div>
                        <div className="text-2xl font-semibold  mt-3 mb-1">{totalValues.totalFuelConsumed}<span className='text-sm'> L</span></div>
                        
                        <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
                    </div>
                    
                    <div className="mt-4 ">
                        <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1"><AiOutlineDollarCircle className='bg-[#719438]/30 text-xl rounded-full p-1 text-[#719438]' /> Fuel Cost</div>
                        <div className="text-2xl font-semibold  mt-3 mb-1"><span className='text-sm'> ₹</span>{totalValues.totalFuelCost.toFixed(2)}</div>
                        
                        <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
                    </div>


                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Home;





// import React, { useState } from 'react'
// import { DummyData } from '../dummydata/page'
// import { Link } from 'react-router-dom';
// import { FaChevronLeft } from "react-icons/fa";
// import { FaChevronRight } from "react-icons/fa";
// import { GoArrowRight } from "react-icons/go";
// import { GiPathDistance } from "react-icons/gi";
// import { FaRegClock } from "react-icons/fa";
// import { TbBrandSpeedtest } from "react-icons/tb";
// import { IoMdSpeedometer } from "react-icons/io";
// import { SiFueler } from "react-icons/si";
// import { AiOutlineDollarCircle } from "react-icons/ai";
// import { TbArrowZigZag } from "react-icons/tb";
// import { FaCalendarAlt } from "react-icons/fa";

// const formattedDate = (dateString) => {
//   return new Date(dateString).toISOString().split('T')[0];
// };

// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   if (isNaN(date.getTime())) {
//       return 'Invalid Date'; // Handle invalid date
//   }
//   // Subtract one day (24 hours in milliseconds)
//   const previousDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
//   return previousDay.toLocaleDateString('en-GB', { month: 'short',day: '2-digit' }); // Format as "22 Mar"
// };
  

// const convertDistance = (meters) => {
//   return (meters / 1000).toFixed(2); 
// };

// const incrementDate = (dateStr) => {
//   const date = new Date(dateStr);
//   date.setDate(date.getDate() + 1); 
//   return formattedDate(date);
// }; 
// const DecrementDate = (dateStr) => {
//   const date = new Date(dateStr);
//   date.setDate(date.getDate() - 1);
//   return formattedDate(date);
// };
  
// function CustomRange() {
//     const date = '2024-03-21';
//     const olddate = '2024-02-29';
//     const newdate = '2024-05-21';
//     const [isVal ,setIsVal] = useState(date)
    
//     console.log(isVal)
    
//     const handleIncrementDate = () => {
//       console.log(olddate,isVal,"asdad")
//       if(newdate > isVal)
//       setIsVal(prevDate => incrementDate(prevDate));
//     };
//     const handleDecrementDate = () => {
//       if(olddate < isVal){
//         setIsVal(prevDate => DecrementDate(prevDate));
//       }
//     };
//     const convertSecondsToTime = (seconds) => {
//       const hours = Math.floor(seconds / 3600);
//       const minutes = Math.floor((seconds % 3600) / 60);
//       const secondsRemaining = seconds % 60;
    
//       return <div>{hours}<span className='text-sm'>h</span> {minutes}<span className='text-sm'>m</span> {secondsRemaining}<span className='text-sm'>s</span></div>;
//     };

//     const startDate = '2024-03-01';
//     const endDate = '2024-03-07';
    
//     const [currentDate, setCurrentDate] = useState(startDate);

//     const filteredData = DummyData.value.filter(item => {
//         const itemDate = formattedDate(item.startDate);
//         return itemDate >= startDate && itemDate <= endDate;
//     });

//     const totalValues = filteredData.reduce((acc, curr) => {
//         acc.totalDistance += curr.distance || 0;
//         acc.totalDuration += curr.duration || 0;
//         acc.totalAverageSpeed += curr.averageSpeed || 0;
//         acc.totalTopSpeed += curr.topSpeed || 0;
//         acc.totalFuelConsumed += 3.01;  // Assuming fixed fuel consumption for simplicity
//         acc.totalFuelCost += (convertDistance(curr.distance) / 3); // Example formula for fuel cost
//         return acc;
//     }, {
//         totalDistance: 0,
//         totalDuration: 0,
//         totalAverageSpeed: 0,
//         totalTopSpeed: 0,
//         totalFuelConsumed: 0,
//         totalFuelCost: 0,
//     });
//   return (
//     <div className=' bg-black min-h-screen '>
//       {
//         DummyData.value
//           .filter(item => formattedDate(item.startDate) === isVal) // Filter by date
//           .map((ele, i) => (
//       <div className="bg-black text-white max-w-sm mx-auto pb-10 border border-white/20">
//         <div className="bg-[#1A1A1A] p-4 rounded-b-xl">
//           <h1 className="text-base font-semibold">Statistics</h1>
//           <div className="mt-6 flex justify-between text-[#9B9B9B] items-center">
//             <Link to={"/DateRange/" + ele.startDate} className="text-xs flex items-center gap-2"> <FaCalendarAlt />{formatDate(isVal)} </Link>
//             <div className="flex gap-6">
//               <span onClick={handleDecrementDate} className='cursor-pointer p-2 hover:text-white/35'><FaChevronLeft /></span>
//               <span onClick={handleIncrementDate} className='cursor-pointer p-2 hover:text-white/35'><FaChevronRight /></span>
//           </div>
//         </div>

//       </div>
     
//       <div key={i} className="mt-4">
      
//         <div className="px-4">
//           <div className="bg-[#1A1A1A] p-4 my-6 rounded-xl">
//             <div className="flex justify-between">
//               <h1 className="font-semibold text-sm">Riding Behaviour</h1>
//               <GoArrowRight />
//             </div>
//             <div className="bg-[#222222] p-2 border border-[#C6C6C600] rounded-xl mt-2">
//               <div className="flex items-center text-sm gap-4">
//                 <div className="font-semibold flex items-center gap-3 border border-[#259DFE] rounded-md"> 
//                   <span className="bg-[#259DFE] p-1 px-2 h-full flex items-center justify-center text-xs">91%</span>
//                   <span className="p-1 text-xs">Excellent</span>
//                 </div>
//                 <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#1A1A1A] p-6 my-6 rounded-xl">
//             <div className="flex justify-between">
//               <h1 className="font-semibold text-[#F3F3F3] text-sm">Journey </h1>
//                <GoArrowRight />
//             </div>
//             <div className="grid grid-cols-2 gap-5">
//               <div className="mt-4 border-r border-r-[#FFFFFF66]">
//                 <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1" ><GiPathDistance className='bg-[#6EDDC9]/30 text-xl rounded-full p-1 text-[#6EDDC9]' /> Distance Travelled</div>
//                 <div className="text-2xl font-semibold  mt-3 mb-1">{convertDistance(ele.distance)} <span className='text-sm'>km</span></div>
                
//                 <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
//               </div>
              
//               <div className="mt-4 ">
//                 <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1"><FaRegClock className='bg-[#00A8E2]/30 text-xl rounded-full p-1 text-[#6EDDC9]'  />Time Duration</div>
//                 <div className="text-2xl font-semibold  mt-3 mb-1">{convertSecondsToTime(ele.duration)}</div>
                
//                 <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
//               </div>


//               </div>
//           </div>
//           <div className="bg-[#1A1A1A] p-6 my-6 rounded-xl">
//             <div className="flex justify-between">
//               <h1 className="font-semibold text-[#F3F3F3]">Speed </h1>
//                <GoArrowRight />
//             </div>
//             <div className="grid grid-cols-2 gap-5">
//               <div className="mt-4 border-r border-r-[#FFFFFF66]">
//                 <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1" ><IoMdSpeedometer className='bg-[#AC630D]/30 text-xl rounded-full p-1 text-[#AC630D]' />Average Speed</div>
//                 <div className="text-2xl font-semibold  mt-3 mb-1">{ele.averageSpeed ? parseFloat(ele.averageSpeed.toFixed(2)) : 0}<span className='text-sm'> km/hr</span></div>
                
//                 <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
//               </div>
              
//               <div className="mt-4 ">
//                 <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1"><TbBrandSpeedtest className='bg-[#E2B519]/30 text-xl rounded-full p-1 text-[#E2B519]' />Top Speed</div>
//                 <div className="text-2xl font-semibold  mt-3 mb-1">{ele.topSpeed ? parseFloat(ele.topSpeed.toFixed(2)) : 0}<span className='text-sm'> km/hr</span></div>
//                 <p className="text-[10px]"> <span className="text-[#5FA04F]">24%</span> vs preceding period </p>
//               </div>


//               </div>
//           </div>
//           <div className="bg-[#1A1A1A] p-6 my-6 rounded-xl">
//             <div className="flex justify-between">
//               <h1 className="font-semibold text-[#F3F3F3]">Fuel </h1>
//                <GoArrowRight />
//             </div>
//             <div className="grid grid-cols-2 gap-5">
//               <div className="mt-4 border-r border-r-[#FFFFFF66]">
//                 <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1" ><SiFueler className='bg-[#B3DD6E]/30 text-xl rounded-full p-1 text-[#DADADA]' /> Fuel Consumed</div>
//                 <div className="text-2xl font-semibold  mt-3 mb-1">3.01<span className='text-sm'> L</span></div>
                
//                 <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
//               </div>
              
//               <div className="mt-4 ">
//                 <div className="text-[#FFFFFF99] text-[10px] flex items-center gap-1"><AiOutlineDollarCircle className='bg-[#719438]/30 text-xl rounded-full p-1 text-[#719438]' /> Fuel Cost</div>
//                 <div className="text-2xl font-semibold  mt-3 mb-1"><span className='text-sm'> ₹</span>{(convertDistance(ele.distance)/3).toFixed(2)}</div>
                
//                 <p className="text-[10px] col-span-2 text-center flex items-center gap-1"> <span className="text-[#D24343] flex items-center gap-1"><TbArrowZigZag className=' rotate-90' />24%</span> vs preceding period </p>
//               </div>


//               </div>
//           </div>

//         </div>


//         </div>
//       </div>
//           ))
//         }
//     </div>

//   )
// }

// export default CustomRange
