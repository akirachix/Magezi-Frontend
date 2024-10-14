
// "use client";

// import { FC, useEffect, useState } from "react";
// import Link from "next/link";
// import SideBar from "../components/SideBarPwa";
// import SellerNotifications from "../components/NotificationsBell";
// import { Transaction } from "../utils/types";
// import { fetchUsers } from "../utils/getUsers";


// interface User {
//   id: string;
//   first_name: string;
//   last_name: string;
//   username?: string;
// }

// interface LandDetail {
//   id: string;
//   owner_name: string;
//   parcel_number: string;
// }

// const SellerPage: FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
//   const [currentUserParcels, setCurrentUserParcels] = useState<string[]>([]);
//   const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
//   const [isLoadingUsers, setIsLoadingUsers] = useState(true);
//   const [isLoadingLandDetails, setIsLoadingLandDetails] = useState(true);
//   const [errorTransactions, setErrorTransactions] = useState<string | null>(null);
//   const [errorUsers, setErrorUsers] = useState<string | null>(null);
//   const [errorLandDetails, setErrorLandDetails] = useState<string | null>(null);

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

//     const fetchAndProcessUsers = async () => {
//       try {
//         const fetchedUsers = await fetchUsers();
//         const processedUsers = fetchedUsers.map((user: User) => ({
//           ...user,
//           username: `${user.first_name} ${user.last_name}`.trim()
//         }));
//         setUsers(processedUsers);
//       } catch (error) {
//         setErrorUsers("Failed to load users. Please try again later.");
//         console.error(error);
//       } finally {
//         setIsLoadingUsers(false);
//       }
//     };

//     const fetchLandDetails = async () => {
//       try {
//         const response = await fetch('https://shawazi-6941c000049b.herokuapp.com/api/land-details/');
//         if (!response.ok) {
//           throw new Error("Failed to fetch land details");
//         }
//         const data = await response.json();
//         const refinedLandDetails = data.map((detail: any) => ({
//           id: detail.id,
//           owner_name: detail.owner_name,
//           parcel_number: detail.parcel_number
//         }));
//         setLandDetails(refinedLandDetails);
//       } catch (error) {
//         setErrorLandDetails("Failed to load land details. Please try again later.");
//         console.error(error);
//       } finally {
//         setIsLoadingLandDetails(false);
//       }
//     };

//     fetchTransactions();
//     fetchAndProcessUsers();
//     fetchLandDetails();
//   }, []);

//   useEffect(() => {
//     // Compare owner names with usernames and set current user parcels
//     if (users.length > 0 && landDetails.length > 0) {
//       const currentUser = users[0]; // Assuming the first user is the current user
//       const matchingParcels = landDetails
//         .filter(land => land.owner_name === currentUser.username)
//         .map(land => land.parcel_number);
//       setCurrentUserParcels(matchingParcels);
//     }
//   }, [users, landDetails]);

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen mt-10">
//       <SideBar userRole={""} />

//       <div className="flex-1 p-6">
//         <div className="flex justify-end mb-4">
//           <SellerNotifications />
//         </div>

//         <header className="mb-8">
//           <h2 className="text-2xl font-semibold text-primary lg:text-3xl">Hello, Welcome to Shawazi</h2>
//         </header>

//         <section className="grid grid-cols-1 h-[15%] sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             Go to chats
//           </button>
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             Upload receipt of payment
//           </button>
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             View Profile
//           </button>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-[10%]">Recent Transactions</h3>
//           <table className="w-full text-left border-collapse mb-8">
//             {/* ... (transaction table code remains the same) ... */}
//           </table>
//           <div className="flex justify-end">
//             <Link href="/transactions/history-of-transactions">
//               <button className="bg-hover text-white py-2 px-4 rounded-lg">View More</button>
//             </Link>
//           </div>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-[10%]">Your Land Parcels</h3>
//           {isLoadingUsers || isLoadingLandDetails ? (
//             <p>Loading your land parcels...</p>
//           ) : errorUsers || errorLandDetails ? (
//             <p>Error: Failed to load your land parcels. Please try again later.</p>
//           ) : currentUserParcels.length > 0 ? (
//             <ul className="list-disc pl-5">
//               {currentUserParcels.map((parcel, index) => (
//                 <li key={index} className="text-sm md:text-base lg:text-lg">{parcel}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>You don't have any registered land parcels.</p>
//           )}
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-[10%]">All Land Details</h3>
//           {isLoadingLandDetails ? (
//             <p>Loading land details...</p>
//           ) : errorLandDetails ? (
//             <p>Error: {errorLandDetails}</p>
//           ) : (
//             <table className="w-full text-left border-collapse mb-8">
//               {/* <thead>
//                 <tr className="border-b">
//                   <th className="p-2 text-black text-sm md:text-base lg:text-lg">Owner Name</th>
//                   <th className="p-2 text-black text-sm md:text-base lg:text-lg">Parcel Number</th>
//                 </tr>
//               </thead> */}
//               <tbody>
//                 {landDetails.map((land) => (
//                   <tr key={land.id} className="border-b border-primary">
//                     <td className="p-2 text-sm md:text-base lg:text-lg">{land.owner_name}</td>
//                     <td className="p-2 text-sm md:text-base lg:text-lg">{land.parcel_number}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SellerPage;




// "use client";

// import { FC, useEffect, useState } from "react";
// import Link from "next/link";
// import SideBar from "../components/SideBarPwa";
// import SellerNotifications from "../components/NotificationsBell";
// import { Transaction } from "../utils/types";
// import { fetchUsers } from "../utils/getUsers";


// interface User {
//   id: string;
//   first_name: string;
//   last_name: string;
//   username?: string;
// }

// interface LandDetail {
//   id: string;
//   owner_name: string;
//   parcel_number: string;
// }

// const SellerPage: FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
//   const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
//   const [isLoadingUsers, setIsLoadingUsers] = useState(true);
//   const [isLoadingLandDetails, setIsLoadingLandDetails] = useState(true);
//   const [errorTransactions, setErrorTransactions] = useState<string | null>(null);
//   const [errorUsers, setErrorUsers] = useState<string | null>(null);
//   const [errorLandDetails, setErrorLandDetails] = useState<string | null>(null);

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

//     const fetchAndProcessUsers = async () => {
//       try {
//         const fetchedUsers = await fetchUsers();
//         const processedUsers = fetchedUsers.map((user: User) => ({
//           ...user,
//           username: `${user.first_name} ${user.last_name}`.trim()
//         }));
//         setUsers(processedUsers);
//       } catch (error) {
//         setErrorUsers("Failed to load users. Please try again later.");
//         console.error(error);
//       } finally {
//         setIsLoadingUsers(false);
//       }
//     };

//     const fetchLandDetails = async () => {
//       try {
//         const response = await fetch('https://shawazi-6941c000049b.herokuapp.com/api/land-details/');
//         if (!response.ok) {
//           throw new Error("Failed to fetch land details");
//         }
//         const data = await response.json();
//         // Only keep the owner_name and parcel_number from each land detail
//         const refinedLandDetails = data.map((detail: any) => ({
//           id: detail.id,
//           owner_name: detail.owner_name,
//           parcel_number: detail.parcel_number
//         }));
//         setLandDetails(refinedLandDetails);
//       } catch (error) {
//         setErrorLandDetails("Failed to load land details. Please try again later.");
//         console.error(error);
//       } finally {
//         setIsLoadingLandDetails(false);
//       }
//     };

//     fetchTransactions();
//     fetchAndProcessUsers();
//     fetchLandDetails();
//   }, []);

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen mt-10">
//       <SideBar userRole={""} />

//       <div className="flex-1 p-6">
//         <div className="flex justify-end mb-4">
//           <SellerNotifications />
//         </div>

//         <header className="mb-8">
//           <h2 className="text-2xl font-semibold text-primary lg:text-3xl">Hello, Welcome to Shawazi</h2>
//         </header>

//         <section className="grid grid-cols-1 h-[15%] sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             Go to chats
//           </button>
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             Upload receipt of payment
//           </button>
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             View Profile
//           </button>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-[10%]">Recent Transactions</h3>
//           <table className="w-full text-left border-collapse mb-8">
//             {/* ... (transaction table code remains the same) ... */}
//           </table>
//           <div className="flex justify-end">
//             <Link href="/transactions/history-of-transactions">
//               <button className="bg-hover text-white py-2 px-4 rounded-lg">View More</button>
//             </Link>
//           </div>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-[10%]">Users</h3>
//           {isLoadingUsers ? (
//             <p>Loading users...</p>
//           ) : errorUsers ? (
//             <p>Error: {errorUsers}</p>
//           ) : (
//             <ul>
//               {users.map((user) => (
//                 <li key={user.id}>{user.username}</li>
//               ))}
//             </ul>
//           )}
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-[10%]">Land Details</h3>
//           {isLoadingLandDetails ? (
//             <p>Loading land details...</p>
//           ) : errorLandDetails ? (
//             <p>Error: {errorLandDetails}</p>
//           ) : (
//             <table className="w-full text-left border-collapse mb-8">
//               <thead>
//                 <tr className="border-b">
//                   <th className="p-2 text-black text-sm md:text-base lg:text-lg">Owner Name</th>
//                   <th className="p-2 text-black text-sm md:text-base lg:text-lg">Parcel Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {landDetails.map((land) => (
//                   <tr key={land.id} className="border-b border-primary">
//                     <td className="p-2 text-sm md:text-base lg:text-lg">{land.owner_name}</td>
//                     <td className="p-2 text-sm md:text-base lg:text-lg">{land.parcel_number}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SellerPage;









"use client"
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import SideBar from "@/app/components/SideBarPwa";
import SellerNotifications from "@/app/components/NotificationsBell";
import { Transaction } from "@/app/utils/types"; 

const SellerPage: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [landDetails, setLandDetails] = useState<LandDetail[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [isLoadingLandDetails, setIsLoadingLandDetails] = useState(true);
  const [errorTransactions, setErrorTransactions] = useState<string | null>(null);
  const [errorLandDetails, setErrorLandDetails] = useState<string | null>(null);
  
  // Assuming seller_id is available on this page
  const seller_id = 1; // Replace with actual seller_id from the page's context or API
  
  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data.slice(0, 5)); // Keep only 5 most recent transactions
      } catch (error) {
        setErrorTransactions("Failed to load transactions. Please try again later.");
        console.error(error);
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, []);

  const fetchLandDetails = async () => {
    try {
      const response = await fetch("https://shawazi-6941c000049b.herokuapp.com/api/land-details/");
      if (!response.ok) {
        throw new Error("Failed to fetch land details");
      }
      const data = await response.json();
      const refinedLandDetails = data.map((detail: any) => ({
        id: detail.id,
        owner_name: detail.owner_name,
        parcel_number: detail.parcel_number,
        latitude: detail.latitude,
        longitude: detail.longitude,
      }));
      setLandDetails(refinedLandDetails);
    } catch (error) {
      setErrorLandDetails("Failed to load land details. Please try again later.");
      console.error(error);
    } finally {
      setIsLoadingLandDetails(false);
    }
  };

  useEffect(() => {
    fetchLandDetails();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter land parcels belonging to the seller based on seller_id
  const sellerLandDetails = landDetails.filter((land) => land.owner_name === `Seller_${seller_id}`);

  // Google Map component to display the land based on latitude and longitude
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const defaultCenter = {
    lat: 0, // Default latitude value if no data available
    lng: 0, // Default longitude value if no data available
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mt-10">
      <SideBar userRole={""} />

      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <SellerNotifications />
        </div>

        <header className="mb-8">
          <h2 className="text-2xl font-semibold text-primary lg:text-3xl">
            Hello, Welcome to Shawazi
          </h2>
        </header>

     
        <section className="grid grid-cols-1 h-[15%] sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
            Go to chats
          </button>
          <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
            Upload receipt of payment
          </button>
          <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
            View Profile
          </button>
        </section>

        <section>
          <h3 className="text-lg font-semibold mt-[10%]">Recent Transactions</h3>
          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-black text-sm md:text-base lg:text-lg">Date</th>
                <th className="p-2 text-black text-sm md:text-base lg:text-lg">Status</th>
                <th className="p-2 text-black text-sm md:text-base lg:text-lg">Amount</th>
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
                    <td className="p-2 text-sm md:text-base lg:text-lg">{formatDate(transaction.date)}</td>
                    <td className="p-2 text-sm md:text-base lg:text-lg">
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
                    <td className="p-2 text-sm md:text-base lg:text-lg">{transaction.amount}</td>
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
              <button className="bg-hover text-white py-2 px-4 rounded-lg">View More</button>
            </Link>
          </div>
        </section>

        {/* Seller's Land Parcels */}
        <section>
          <h3 className="text-lg font-semibold mt-[10%]">Seller's Land Parcels</h3>
          {isLoadingLandDetails ? (
            <p>Loading land details...</p>
          ) : errorLandDetails ? (
            <p>Error: {errorLandDetails}</p>
          ) : sellerLandDetails.length > 0 ? (
            sellerLandDetails.map((land) => (
              <div key={land.id} className="mb-8">
                <p className="text-black text-sm md:text-base lg:text-lg">
                  Parcel Number: {land.parcel_number}
                </p>

                {/* Google Map */}
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={land.latitude && land.longitude ? { lat: land.latitude, lng: land.longitude } : defaultCenter}
                    zoom={10}
                  >
                    {land.latitude && land.longitude && (
                      <Marker position={{ lat: land.latitude, lng: land.longitude }} />
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            ))
          ) : (
            <p>No land details found for this seller.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default SellerPage;





// "use client";

// import { FC, useEffect, useState } from "react";
// import Link from "next/link";
// import SideBar from "../components/SideBarPwa";
// import SellerNotifications from "../components/NotificationsBell";
// import { Transaction } from "../utils/types"; 

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
//     const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen mt-10">
//       <SideBar userRole={""} />

//       <div className="flex-1 p-6">
//         <div className="flex justify-end mb-4">
//           <SellerNotifications />
//         </div>

//         <header className="mb-8">
//           <h2 className="text-2xl font-semibold text-primary lg:text-3xl">Hello, Welcome to Shawazi</h2>
//         </header>

//         <section className="grid grid-cols-1 h-[15%] sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             Go to chats
//           </button>
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             Upload receipt of payment
//           </button>
//           <button className="bg-yellow-500 text-[18px] lg:text-[20px] text-white py-6 lg:py-8 px-4 lg:px-6 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//             View Profile
//           </button>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-[10%]">Recent Transactions</h3>
//           <table className="w-full text-left border-collapse mb-8">
//             <thead>
//               <tr className="border-b">
//                 <th className="p-2 text-black text-sm md:text-base lg:text-lg">Date</th>
//                 <th className="p-2 text-black text-sm md:text-base lg:text-lg">Status</th>
//                 <th className="p-2 text-black text-sm md:text-base lg:text-lg">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoadingTransactions ? (
//                 <tr>
//                   <td className="p-2" colSpan={3}>
//                     Loading...
//                   </td>
//                 </tr>
//               ) : errorTransactions ? (
//                 <tr>
//                   <td className="p-2" colSpan={3}>
//                     Error: {errorTransactions}
//                   </td>
//                 </tr>
//               ) : transactions.length > 0 ? (
//                 transactions.map((transaction, idx) => (
//                   <tr key={idx} className="border-b border-primary">
//                     <td className="p-2 text-sm md:text-base lg:text-lg">{formatDate(transaction.date)}</td>
//                     <td className="p-2 text-sm md:text-base lg:text-lg">
//                       <span
//                         className={`px-2 py-2 rounded-lg text-white ${
//                           transaction.status === "Complete"
//                             ? "bg-hover"
//                             : transaction.status === "Pending"
//                             ? "bg-secondary"
//                             : transaction.status === "Rejected"
//                             ? "bg-red-500"
//                             : ""
//                         }`}
//                       >
//                         {transaction.status}
//                       </span>
//                     </td>
//                     <td className="p-2 text-sm md:text-base lg:text-lg">{transaction.amount}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="p-2" colSpan={3}>
//                     No transactions found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           <div className="flex justify-end">
//             <Link href="/transactions/history-of-transactions">
//               <button className="bg-hover text-white py-2 px-4 rounded-lg">View More</button>
//             </Link>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SellerPage;
