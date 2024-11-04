"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { postTransaction } from "@/app/utils/postTransaction";
import { fetchTransaction } from "@/app/utils/fetchTransaction";
import { formatDate } from "@/app/utils/formatDate";
import Cookies from "js-cookie";
import SellerSidebar from "../../components/Sellersidebar";

interface Transaction {
  unique_code: string;
  name: string;
  date: string;
  status: string;
  amount: number;
  buyerUploaded?: boolean;
  sellerUploaded?: boolean;
  buyerImageUrl?: string;
  sellerImageUrl?: string;
}

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [agreementId, setAgreementId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [userType, setUserType] = useState<string>("buyer");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransaction();
        console.log("Fetched transactions:", data);
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      setMessage("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append(`${userType}image`, image);
    formData.append("user_type", userType);
    if (agreementId) {
      formData.append("agreement_id", agreementId);
    }
    try {
      const data = await postTransaction(formData);
      setMessage(`Transaction successful: ${data.message}`);
      setIsModalOpen(true); // Open success modal
      setImage(null);
      setAgreementId("");
      setTimeout(() => {
        setIsModalOpen(false); // Close the modal after some time or after user action
      }, 2000);
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      setMessage(`Error: ${errorMessage}`);
      setIsErrorModalOpen(true); // Open error modal
    }
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserType = e.target.value;
    setUserType(selectedUserType);
    Cookies.set("userType", selectedUserType);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <div className="lg:w-64 xl:w-72 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen md:border-r md:border-gray-200">
        <SellerSidebar />
      </div>
      <div className="flex-1 p-4 sm:p-6 md:p-6 lg:p-8 md:pl-8 lg:pl-12 xl:pl-16 overflow-x-hidden md:max-w-[calc(100%-16rem)] lg:max-w-none">
        <div className="relative flex items-center justify-center mb-6 md:mb-8">
          <Link
            href="/seller/transactions/transactions"
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
          >
            <IoArrowBackOutline className="border-2 text-black hover:bg-secondary text-[20px] sm:text-[24px] md:text-[28px] ml-2 sm:ml-4" />
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary pl-10 sm:pl-5">
            Transactions
          </h1>
        </div>
        <div className="upload-file-container mb-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12">
          <div className="border-2 border-dashed border-gray-300 text-center p-4 sm:p-6 md:p-8 lg:p-10">
            <h2 className="text-lg sm:text-xl md:text-2xl mb-2">Upload Files</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2">
              Add photo receipts for your transactions
            </p>
            <div className="flex items-center justify-center mx-auto border border-black p-2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
              <MdFileUpload className="text-3xl sm:text-4xl md:text-5xl" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-4 sm:p-6 bg-white shadow-md rounded mb-6"
            >
              {message && <p className="text-red-500 text-sm">{message}</p>}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  required
                  className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Agreement ID
                </label>
                <input
                  type="text"
                  value={agreementId}
                  onChange={(e) => setAgreementId(e.target.value)}
                  className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <select
                  value={userType}
                  onChange={handleUserTypeChange}
                  className="mt-1 block w-full text-sm border border-gray-300 p-1 rounded-md shadow-sm focus:ring focus:ring-secondary"
                >
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                  
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-hover text-white py-2 rounded-md hover:bg-secondary text-sm"
              >
                Submit Transaction
              </button>
            </form>
          </div>
        </div>
        {userType === "seller" && (
          <div className="images-container mb-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12">
            <h2 className="text-xl sm:text-2xl mb-4">Your Uploaded Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactions.map((transaction, idx) =>
                transaction.sellerUploaded && transaction.sellerImageUrl ? (
                  <div key={idx} className="border rounded-lg p-2">
                    <Image
                      src={transaction.sellerImageUrl}
                      alt={`Uploaded image for transaction ${idx + 1}`}
                      className="w-full h-auto rounded-md"
                      width={500} // Set appropriate width
                      height={300} // Set appropriate height
                    />
                    <p className="mt-2 text-xs sm:text-sm">
                      Uploaded on: {formatDate(transaction.date)}
                    </p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
        {isLoading ? (
          <p className="text-sm">Loading transactions...</p>
        ) : error ? (
          <p className="text-red-500 text-sm">Error: {error}</p>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-hover">
                  <tr className="border-b">
                    <th className="px-4 text-white py-2 font-semibold">Date</th>
                    <th className="px-4 py-2 text-white font-semibold">Status</th>
                    <th className="px-4 py-2 text-white font-semibold">Amount</th>
                    <th className="px-4 py-2 text-white font-semibold">Code</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                      )
                      .slice(0, 4) // Adjust the limit of rows displayed
                      .map((transaction, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="px-4 py-2 whitespace-nowrap">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="p-1 xs:p-2">
                            <span
                              className={`w-16 xs:w-20 sm:w-24 h-6 xs:h-8 sm:h-10 flex items-center justify-center px-1 xs:px-2 py-0.5 xs:py-1 rounded-lg text-white text-xs xs:text-sm md:text-base ${
                                transaction.status === "Complete"
                                  ? "bg-hover"
                                  : transaction.status === "Pending"
                                  ? "bg-secondary"
                                  : transaction.status === "rejected"
                                  ? "bg-red-500"
                                  : ""
                              }`}
                            >
                              {transaction.status === "Complete"
                                ? "Complete"
                                : transaction.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {transaction.amount}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {transaction.unique_code}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-center">
                        No transactions available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-[30px] font-bold text-center">Success</h2>
            <Image 
              src="/images/transactions.png" 
              alt="Secure Land Transactions"
              width={450}
              height={450}
              className="max-w-full h-auto"  
            />
            <p className="text-center">{message}</p>
            <div className="items-center">
              <button onClick={closeModal} className="mt-4 bg-hover text-white px-4 py-2 rounded hover:bg-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isErrorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-[30px] font-bold text-center">Error</h2>
            <Image 
              src="/images/error.png" 
              alt="Secure Land Transactions"
              width={450}
              height={450}
              className="max-w-full h-auto"  
            />
            <p className="text-center">{message}</p>
            <div className="items-center">
              <button onClick={closeErrorModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;































// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { MdFileUpload } from "react-icons/md";
// import Link from "next/link";
// import { IoArrowBackOutline } from "react-icons/io5";
// import { postTransaction } from "@/app/utils/postTransaction";
// import { fetchTransaction } from "@/app/utils/fetchTransaction";
// import { formatDate } from "@/app/utils/formatDate";
// import Cookies from "js-cookie";
// import SellerSidebar from "../../components/Sellersidebar";


// interface Transaction {
//   unique_code: string;
//   name: string;
//   date: string;
//   status: string;
//   amount: number;
//   buyerUploaded?: boolean;
//   sellerUploaded?: boolean;
//   buyerImageUrl?: string;
//   sellerImageUrl?: string;
// }

// const TransactionsPage: React.FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [image, setImage] = useState<File | null>(null);
//   const [agreementId, setAgreementId] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [userType, setUserType] = useState<string>("buyer");
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

//   useEffect(() => {
//     const loadTransactions = async () => {
//       try {
//         const data = await fetchTransaction();
//         console.log("Fetched transactions:", data);
//         setTransactions(data);
//         setIsLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Unknown error");
//         setIsLoading(false);
//       }
//     };
//     loadTransactions();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!image) {
//       setMessage("Please select an image.");
//       return;
//     }
//     const formData = new FormData();
//     formData.append(`${userType}image`, image);
//     formData.append("user_type", userType);
//     if (agreementId) {
//       formData.append("agreement_id", agreementId);
//     }
//     try {
//       const data = await postTransaction(formData);
//       setMessage(`Transaction successful: ${data.message}`);
//       setImage(null);
//       setAgreementId("");
//     } catch (error) {
//       const errorMessage =
//         (error as Error).message || "An unknown error occurred";
//       setMessage(`Error: ${errorMessage}`);
//     }
//   };

//   const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedUserType = e.target.value;
//     setUserType(selectedUserType);
//     Cookies.set("userType", selectedUserType);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const closeErrorModal = () => {
//     setIsErrorModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
//       <div className="lg:w-64 xl:w-72 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen md:border-r md:border-gray-200">
//         <SellerSidebar />
//       </div>
//       <div className="flex-1 p-4 sm:p-6 md:p-6 lg:p-8 md:pl-8 lg:pl-12 xl:pl-16 overflow-x-hidden md:max-w-[calc(100%-16rem)] lg:max-w-none">
//         <div className="relative flex items-center justify-center mb-6 md:mb-8">
//           <Link
//             href="/seller/transactions/transactions"
//             className="absolute left-0 top-1/2 transform -translate-y-1/2"
//           >
//             <IoArrowBackOutline className="border-2 text-black hover:bg-secondary text-[20px] sm:text-[24px] md:text-[28px] ml-2 sm:ml-4" />
//           </Link>
//           <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary pl-10 sm:pl-5">
//             Transactions
//           </h1>
//         </div>
//         <div className="upload-file-container mb-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12">
//           <div className="border-2 border-dashed border-gray-300 text-center p-4 sm:p-6 md:p-8 lg:p-10">
//             <h2 className="text-lg sm:text-xl md:text-2xl mb-2">
//               Upload Files
//             </h2>
//             <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2">
//               Add photo receipts for your transactions
//             </p>
//             <div className="flex items-center justify-center mx-auto border border-black p-2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
//               <MdFileUpload className="text-3xl sm:text-4xl md:text-5xl" />
//             </div>
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4 p-4 sm:p-6 bg-white shadow-md rounded mb-6"
//             >
//               {message && <p className="text-red-500 text-sm">{message}</p>}
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImage(e.target.files?.[0] || null)}
//                   required
//                   className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Agreement ID
//                 </label>
//                 <input
//                   type="text"
//                   value={agreementId}
//                   onChange={(e) => setAgreementId(e.target.value)}
//                   className="mt-1 block w-full text-sm border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-secondary"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   User Type
//                 </label>
//                 <select
//                   value={userType}
//                   onChange={handleUserTypeChange}
//                   className="mt-1 block w-full text-sm border border-gray-300 p-1 rounded-md shadow-sm focus:ring focus:ring-secondary"
//                 >
//                   <option value="buyer">Buyer</option>
//                   <option value="seller">Seller</option>
//                 </select>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-hover text-white py-2 rounded-md hover:bg-secondary text-sm"
//               >
//                 Submit Transaction
//               </button>
//             </form>
//           </div>
//         </div>
//         {userType === "seller" && (
//           <div className="images-container mb-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12">
//             <h2 className="text-xl sm:text-2xl mb-4">Your Uploaded Images</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {transactions.map((transaction, idx) =>
//                 transaction.sellerUploaded && transaction.sellerImageUrl ? (
//                   <div key={idx} className="border rounded-lg p-2">
//                     <Image
//                       src={transaction.sellerImageUrl}
//                       alt={`Uploaded image for transaction ${idx + 1}`}
//                       className="w-full h-auto rounded-md"
//                     />
//                     <p className="mt-2 text-xs sm:text-sm">
//                       Uploaded on: {formatDate(transaction.date)}
//                     </p>
//                   </div>
//                 ) : null
//               )}
//             </div>
//           </div>
//         )}
//         {isLoading ? (
//           <p className="text-sm">Loading transactions...</p>
//         ) : error ? (
//           <p className="text-red-500 text-sm">Error: {error}</p>
//         ) : (
//           <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
//             <div className="inline-block min-w-full py-2 align-middle">
//               <table className="min-w-full text-left text-sm">
//                 <thead className="bg-hover">
//                   <tr className="border-b">
//                     <th className="px-4 text-white py-2 font-semibold">Date</th>
//                     <th className="px-4 py-2 text-white font-semibold">Status</th>
//                     <th className="px-4 py-2 text-white font-semibold">Amount</th>
//                     <th className="px-4 py-2 text-white font-semibold">Code</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transactions.length > 0 ? (
//                     transactions
//                       .sort(
//                         (a, b) =>
//                           new Date(b.date).getTime() -
//                           new Date(a.date).getTime()
//                       )
//                       .slice(0, 4)
//                       .map((transaction, idx) => (
//                         <tr key={idx} className="border-b">
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             {formatDate(transaction.date)}
//                           </td>
//                           <td className="p-1 xs:p-2">
//                             <span
//                               className={`w-16 xs:w-20 sm:w-24 h-6 xs:h-8 sm:h-10 flex items-center justify-center px-1 xs:px-2 py-0.5 xs:py-1 rounded-lg text-white text-xs xs:text-sm md:text-base ${
//                                 transaction.status === "Complete"
//                                   ? "bg-hover"
//                                   : transaction.status === "Pending"
//                                   ? "bg-secondary"
//                                   : transaction.status === "rejected"
//                                   ? "bg-red-500"
//                                   : ""
//                               }`}
//                             >
//                               {transaction.status === "Complete"
//                                 ? "Complete"
//                                 : transaction.status}
//                             </span>
//                           </td>
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             {transaction.amount}
//                           </td>
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             {transaction.unique_code}
//                           </td>
//                         </tr>
//                       ))
//                   ) : (
//                     <tr>
//                       <td colSpan={4} className="px-4 py-2 text-center">
//                         No transactions available.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-[30px] font-bold text-center">Success</h2>
//             <Image 
//           src="/images/transactions.png" 
//           alt="Secure Land Transactions"
//           width={450}
//           height={450}
//           className="max-w-full h-auto"  
//         />
//             <p className="text-center">{message}</p>
//             <div className="items-center">
//             <button onClick={closeModal} className="mt-4 bg-hover text-white px-4 py-2 rounded hover:bg-secondary">
//               Close
//             </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isErrorModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-[30px] font-bold text-center">Error</h2>
//             <Image 
//           src="/images/error.png" 
//           alt="Secure Land Transactions"
//           width={450}
//           height={450}
//           className="max-w-full h-auto"  
//         />
//             <p className="text-center">{message}</p>
//             <div className="items-center">
//             <button onClick={closeErrorModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
//               Close
//             </button>
//           </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionsPage;