"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Transaction } from "@/app/utils/types";
import SellerNotifications from "@/app/components/Notificationbell";
import SellerSidebar from "../components/Sellersidebar";
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
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:fixed lg:left-0 lg:top-0 lg:h-full mr-42 lg:w-64">
        {/* <SellerSidebar /> */}
      </div>
      <SellerSidebar />
      <div className="flex-1 lg:ml-[16rem] mr-1 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-end mb-4">
          <SellerNotifications />
        </div>
        <header className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl mt-20 font-semibold text-primary">
            Hello, Welcome to Shawazi
          </h2>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/seller/chatroom-page" className="block">
            <button className="bg-yellow-500 w-full lg:h-40 h-20 text-lg sm:text-xl text-white py-4 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
              Go to chats
            </button>
          </Link>
          <Link href="/seller/transactions/upload_transactions" className="block">
            <button className="bg-yellow-500 w-full lg:h-40 h-20 text-lg sm:text-xl text-white py-4 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
              Upload receipt of payment
            </button>
          </Link>
          <Link href="/seller/profile" className="block">
            <button className="bg-yellow-500 w-full lg:h-40 h-20 text-lg sm:text-xl text-white py-4 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
              View Profile
            </button>
          </Link>
        </section>
        {/* <section className="mb-8 mt-10">
          <h2 className="text-xl sm:text-xl lg:text-2xl font-semibold text-primary mb-4">
            Your Current Area
          </h2>
          <LocationMap />
        </section> */}
        <section className="mb-8 mt-10 your-current-area-section">
          <h2 className="text-xl sm:text-xl lg:text-2xl font-semibold text-primary mb-4">
            Your Current Area
          </h2>
          <LocationMap />
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
            <Link href="/seller/transactions/history-of-transactions">
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




























// "use client";

// import { FC, useEffect, useState } from "react";
// import Link from "next/link";
// import { Transaction } from "@/app/utils/types"; 
// import SellerNotifications from "@/app/components/Notificationbell";
// import SideBar from "@/app/components/Sidebarpwa";

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

//       <div className="flex-1 p-4 sm:p-6 lg:p-8">
//         <div className="flex justify-end mb-4">
//           <SellerNotifications/>
//         </div>

//         <header className="mb-8">
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary">Hello, Welcome to Shawazi</h2>
//         </header>

//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <Link href='/chatroom'>
//             <button className="bg-yellow-500 w-full h-40 text-lg sm:text-xl text-white py-6 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//               Go to chats
//             </button>
//           </Link>
//           <Link href='/transactions/upload_transactions'>
//             <button className="bg-yellow-500 w-full h-40 text-lg sm:text-xl text-white py-6 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//               Upload receipt of payment
//             </button>
//           </Link>
//           <Link href='/profile'>
//             <button className="bg-yellow-500 w-full h-40 text-lg sm:text-xl text-white py-6 px-4 rounded-md shadow-lg hover:bg-yellow-600 transition-colors">
//               View Profile
//             </button>
//           </Link>
//         </section>

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
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">{formatDate(transaction.date)}</td>
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">
//                       <span className={`px-2 py-2 rounded-lg text-white ${
//                         transaction.status === "Complete" ? "bg-hover" :
//                         transaction.status === "Pending" ? "bg-secondary" :
//                         transaction.status === "Rejected" ? "bg-red-500" : ""
//                       }`}>
//                         {transaction.status}
//                       </span>
//                     </td>
//                     <td className="p-2 text-sm sm:text-base lg:text-lg">{transaction.amount}</td>
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
//               <button className="bg-hover text-white py-2 px-4 rounded-lg">View More</button>
//             </Link>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SellerPage;