// "use client";

// import { FC, useEffect, useState, useCallback } from "react";
// import Link from "next/link";
// import { Transaction } from "@/app/utils/types";
// import SellerNotifications from "@/app/components/Notificationbell";
// // import SideBar from "@/app/components/Sidebarpwa";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// // Types
// interface Location {
//   lat: number;
//   lng: number;
// }

// // Map Component
// const LocationMap: FC = () => {
//   const [currentLocation, setCurrentLocation] = useState<Location>({
//     lat: 0,
//     lng: 0
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//           setIsLoading(false);
//         },
//         (error) => {
//           setError('Error getting location: ' + error.message);
//           setIsLoading(false);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by your browser');
//       setIsLoading(false);
//     }
//   }, []);

//   const mapContainerStyle = {
//     width: '100%',
//     height: '400px'
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
//         <p className="text-gray-600">Loading map...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full rounded-lg overflow-hidden shadow-lg">
//       <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
//         <GoogleMap
//           mapContainerStyle={mapContainerStyle}
//           center={currentLocation}
//           zoom={15}
//         >
//           <Marker position={currentLocation} />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// // Main Seller Page Component
// const SellerPage: FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
//   const [errorTransactions, setErrorTransactions] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch("/api/transactions");
//         if (!response.ok) {
//           throw new Error("Failed to fetch transactions");
//         }
//         const data = await response.json();
//         setTransactions(data.slice(0, 5)); // Only show 5 most recent transactions
//       } catch (error) {
//         setErrorTransactions("Failed to load transactions. Please try again later.");
//         console.error(error);
//       } finally {
//         setIsLoadingTransactions(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric"
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen mt-10">
//       {/* <SideBar/> */}

//       <div className="flex-1 p-4 sm:p-6 lg:p-8">
//         <div className="flex justify-end mb-4">
//           <SellerNotifications/>
//         </div>

//         {/* Map Section */}
//         <section className="mb-8">
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-4">
//             Your Location
//           </h2>
//           <LocationMap />
//         </section>

//         <header className="mb-8">
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary">
//             Hello, Welcome to Shawazi
//           </h2>
//         </header>

//         {/* Navigation Buttons */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <Link href='/chatroom' className="block">
//             <button className="bg-yellow-500 w-full h-40 text-lg sm:text-xl text-white py-6 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//               Go to chats
//             </button>
//           </Link>
//           <Link href='/transactions/upload_transactions' className="block">
//             <button className="bg-yellow-500 w-full h-40 text-lg sm:text-xl text-white py-6 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//               Upload receipt of payment
//             </button>
//           </Link>
//           <Link href='/profile' className="block">
//             <button className="bg-yellow-500 w-full h-40 text-lg sm:text-xl text-white py-6 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//               View Profile
//             </button>
//           </Link>
//         </section>

//         {/* Transactions Section */}
//         <section>
//           <h3 className="text-lg sm:text-xl mt-10">Recent Transactions</h3>
//           <table className="w-full text-left border-collapse mb-8">
//             <thead>
//               <tr className="border-b">
//                 <th className="p-2 text-black text-sm sm:text-base lg:text-lg">Date</th>
//                 <th className="p-2 text-black text-sm sm:text-base lg:text-lg">Status</th>
//                 <th className="p-2 text-black text-sm sm:text-base lg:text-lg">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoadingTransactions ? (
//                 <tr>
//                   <td className="p-2" colSpan={3}>Loading...</td>
//                 </tr>
//               ) : errorTransactions ? (
//                 <tr>
//                   <td className="p-2" colSpan={3}>Error: {errorTransactions}</td>
//                 </tr>
//               ) : transactions.length > 0 ? (
//                 transactions.map((transaction, idx) => (
//                   <tr key={idx} className="border-b border-primary">
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">
//                       {formatDate(transaction.date)}
//                     </td>
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">
//                       <span className={`px-2 py-2 rounded-lg text-white ${
//                         transaction.status === "Complete" ? "bg-hover" :
//                         transaction.status === "Pending" ? "bg-secondary" :
//                         transaction.status === "Rejected" ? "bg-red-500" : ""
//                       }`}>
//                         {transaction.status}
//                       </span>
//                     </td>
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">
//                       {transaction.amount}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="p-2" colSpan={3}>No transactions found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           <div className="flex justify-end">
//             <Link href="/transactions/history-of-transactions">
//               <button className="bg-hover text-white py-2 px-4 rounded-lg">
//                 View More
//               </button>
//             </Link>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SellerPage;

// "use client";

// import { FC, useEffect, useState, useCallback } from "react";
// import Link from "next/link";
// import { Transaction } from "@/app/utils/types";
// import SellerNotifications from "@/app/components/Notificationbell";
// import LocationMap from "../components/LocationMap";

// const SellerPage: FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
//   const [errorTransactions, setErrorTransactions] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch("/api/transactions");
//         if (!response.ok) {
//           throw new Error("Failed to fetch transactions");
//         }
//         const data = await response.json();
//         setTransactions(data.slice(0, 5));
//       } catch (error) {
//         setErrorTransactions("Failed to load transactions. Please try again later.");
//         console.error(error);
//       } finally {
//         setIsLoadingTransactions(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric"
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen mt-10">

//       <div className="flex-1 p-4 sm:p-6 lg:p-8">
//         <div className="flex justify-end mb-4">
//           <SellerNotifications/>
//         </div>

//         <header className="mb-8">
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary">
//             Hello, Welcome to Shawazi
//           </h2>
//         </header>

//         <section className="mb-8">
//           <h2 className="text-xl sm:text-xl lg:text-2xl font-semibold text-primary mb-4">
//             Your Current Area
//           </h2>
//           <LocationMap />
//         </section>

//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//   <Link href='/chatroom' className="block">
//     <button className="bg-yellow-500 w-full lg:h-40 sm:h-10 text-lg sm:text-xl text-white py-4 sm:py-6 px-2 sm:px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//       Go to chats
//     </button>
//   </Link>
//   <Link href='/transactions/upload_transactions' className="block">
//     <button className="bg-yellow-500 w-full lg:h-40 sm:h-10 text-lg sm:text-xl text-white py-4 sm:py-6 px-2 sm:px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//       Upload receipt of payment
//     </button>
//   </Link>
//   <Link href='/profile' className="block">
//     <button className="bg-yellow-500 w-full lg:h-40 sm:h-10  text-lg sm:text-xl text-white py-4 sm:py-6 px-2 sm:px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//       View Profile
//     </button>
//   </Link>
// </section>

//         <section>
//           <h3 className="text-lg sm:text-xl mt-10">Recent Transactions</h3>
//           <table className="w-full text-left border-collapse mb-8">
//             <thead>
//               <tr className="border-b">
//                 <th className="p-2 text-black text-sm sm:text-base lg:text-lg">Date</th>
//                 <th className="p-2 text-black text-sm sm:text-base lg:text-lg">Status</th>
//                 <th className="p-2 text-black text-sm sm:text-base lg:text-lg">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoadingTransactions ? (
//                 <tr>
//                   <td className="p-2" colSpan={3}>Loading...</td>
//                 </tr>
//               ) : errorTransactions ? (
//                 <tr>
//                   <td className="p-2" colSpan={3}>Error: {errorTransactions}</td>
//                 </tr>
//               ) : transactions.length > 0 ? (
//                 transactions.map((transaction, idx) => (
//                   <tr key={idx} className="border-b border-primary">
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">
//                       {formatDate(transaction.date)}
//                     </td>
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">
//                       <span className={`px-2 py-2 rounded-lg text-white ${
//                         transaction.status === "Complete" ? "bg-hover" :
//                         transaction.status === "Pending" ? "bg-secondary" :
//                         transaction.status === "Rejected" ? "bg-red-500" : ""
//                       }`}>
//                         {transaction.status}
//                       </span>
//                     </td>
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">
//                       {transaction.amount}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="p-2" colSpan={3}>No transactions found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           <div className="flex justify-end">
//             <Link href="/transactions/history-of-transactions">
//               <button className="bg-hover text-white py-2 px-4 rounded-lg">
//                 View More
//               </button>
//             </Link>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SellerPage;

"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Transaction } from "@/app/utils/types";
import SellerNotifications from "@/app/components/Notificationbell";
import LocationMap from "../components/LocationMap";

const SellerPage: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [errorTransactions, setErrorTransactions] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data.slice(0, 5));
      } catch (error) {
        setErrorTransactions(
          "Failed to load transactions. Please try again later."
        );
        console.error(error);
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mt-10">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-end mb-4">
          <SellerNotifications />
        </div>

        <header className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary">
            Hello, Welcome to Shawazi
          </h2>
        </header>

        <section className="mb-8">
          <h2 className="text-xl sm:text-xl lg:text-2xl font-semibold text-primary mb-4">
            Your Current Area
          </h2>
          <LocationMap />
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/chatroom" className="block">
            <button className="bg-yellow-500 w-full lg:h-40 sm:h-10 text-lg sm:text-xl text-white py-4 sm:py-6 px-2 sm:px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
              Go to chats
            </button>
          </Link>
          <Link href="/transactions/upload_transactions" className="block">
            <button className="bg-yellow-500 w-full lg:h-40 sm:h-10 text-lg sm:text-xl text-white py-4 sm:py-6 px-2 sm:px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
              Upload receipt of payment
            </button>
          </Link>
          <Link href="/profile" className="block">
            <button className="bg-yellow-500 w-full lg:h-40 sm:h-10  text-lg sm:text-xl text-white py-4 sm:py-6 px-2 sm:px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
              View Profile
            </button>
          </Link>
        </section>

        <section>
          <h3 className="text-lg sm:text-xl mt-10">Recent Transactions</h3>
          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-black text-sm sm:text-base lg:text-lg">
                  Date
                </th>
                <th className="p-2 text-black text-sm sm:text-base lg:text-lg">
                  Status
                </th>
                <th className="p-2 text-black text-sm sm:text-base lg:text-lg">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoadingTransactions ? (
                <tr>
                  <td className="p-2" colSpan={3}>
                    Loading...
                  </td>
                </tr>
              ) : errorTransactions ? (
                <tr>
                  <td className="p-2" colSpan={3}>
                    Error: {errorTransactions}
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((transaction, idx) => (
                  <tr key={idx} className="border-b border-primary">
                    <td className="p-2 text-sm sm:text-base lg:text-lg">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="p-2 text-sm sm:text-base lg:text-lg">
                      <span
                        className={`px-2 py-2 rounded-lg text-white ${
                          transaction.status === "Complete"
                            ? "bg-hover"
                            : transaction.status === "Pending"
                            ? "bg-secondary"
                            : transaction.status === "Rejected"
                            ? "bg-red-500"
                            : ""
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-2 text-sm sm:text-base lg:text-lg">
                      {transaction.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2" colSpan={3}>
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end">
            <Link href="/transactions/history-of-transactions">
              <button className="bg-hover text-white py-2 px-4 rounded-lg">
                View More
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellerPage;
