"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Teaser = () => {
  const handleClick = () => {
    console.log("Navigating to Dashboard");
  };

  return (
    <div className="flex flex-col mt-10 font-jost px-2 md:px-6">
      <h1 className="text-[#562B00] text-3xl sm:text-4xl md:text-5xl lg:text-4xl 2xl:text-5xl font-bold mb-6 text-center mt-10 md:mt-20">
        WELCOME TO SHAWAZI
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div className="mb-6 lg:mb-0 flex-shrink-0 w-full lg:w-1/2 lg:ml-10">
          <Image
            src="/media/Teaser_locateland.png" 
            alt="Shawazi"
            width={800} 
            height={600} 
            className="w-full h-auto max-w-[800px] object-cover rounded-lg shadow-lg mx-auto"
          />
        </div>
        <div className="flex flex-col lg:w-1/2">
          <p className="text-black text-lg sm:text-xl 2xl:mb-40 md:text-2xl lg:text-xl 2xl:text-[30px] mb-8 2xl:leading-loose lg:leading-loose lg:mb-10 lg:mr-10 lg:mb-18 2xl:mb-40 line-height-20 2xl:mt-20 lg:mt-10">
            Welcome to the Shawazi admin Dashboard, this is your gateway for
            tracking success and making informed decisions
            <span className="text-orange-500 font-bold">
              {" "}
              confidently.
            </span>{" "}
            <br className="hidden md:inline" /> Please feel free to continue
            with our system
          </p>
          <Link href="/admin/dashboarddata" onClick={handleClick}>
            <button className="w-full md:w-60 h-14 bg-[#508408] text-white font-bold rounded-md hover:bg-green-600 transition duration-100 lg:mt-8 lg:mb-6 flex items-center justify-center mx-auto lg:mx-0">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Teaser;




















// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// const Teaser = () => {
//   const handleClick = () => {
//     console.log("Navigating to Dashboard");
//   };

//   return (
//     <div className="flex flex-col mt-10 font-jost px-2 md:px-6">
//       <h1 className="text-[#562B00] text-3xl sm:text-4xl md:text-5xl lg:text-4xl 2xl:text-5xl font-bold mb-6 text-center mt-10 md:mt-20">
//         WELCOME TO SHAWAZI
//       </h1>
//       <div className="flex flex-col lg:flex-row">
//         <div className="mb-6 lg:mb-0 flex-shrink-0 w-full lg:w-1/2 lg:ml-10">
//           <Image
//             src="/media/Teaser_locateland.png" 
//             alt="Shawazi"
//             width={800} 
//             height={600} 
//             className="w-full h-auto max-w-[800px] object-cover rounded-lg shadow-lg mx-auto"
//           />
//         </div>
//         <div className="flex flex-col lg:w-1/2">
//           <p className="text-black text-lg sm:text-xl 2xl:mb-40 md:text-2xl lg:text-xl 2xl:text-[30px] mb-8 2xl:leading-loose lg:leading-loose lg:mb-10 lg:mr-10 lg:mb-18 2xl:mb-40 line-height-20 2xl:mt-20 lg:mt-10">
//             Welcome to the Shawazi admin Dashboard, this is your gateway for
//             tracking success and making informed decisions
//             <span className="text-orange-500 font-bold">
//               {" "}
//               confidently.
//             </span>{" "}
//             <br className="hidden md:inline" /> Please feel free to continue
//             with our system
//           </p>
//           <Link href="./admin/DashboardData" onClick={handleClick}>
//             <button className="w-full md:w-60 h-14 bg-[#508408] text-white font-bold rounded-md hover:bg-green-600 transition duration-100 lg:mt-8 lg:mb-6 flex items-center justify-center mx-auto lg:mx-0">
//               Continue
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Teaser;
