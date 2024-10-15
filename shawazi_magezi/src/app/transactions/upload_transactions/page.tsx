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
import SideBarPwa from "@/app/components/SideBarPwa";

interface Transaction {
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("buyer"); 

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransaction();
        console.log("Fetched transactions:", data);
        setTransactions(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
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
      setImage(null);
      setAgreementId("");
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      setMessage(`Error: ${errorMessage}`);
      setIsErrorModalOpen(true);
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
      <SideBarPwa userRole={""} />
      <div className="flex-1 p-4 sm:p-8 lg:p-16 overflow-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-primary text-center">
          Transactions
        </h1>
        <Link href="/transactions/transactions">
          <IoArrowBackOutline className="border-2 text-black hover:bg-secondary text-[34px] mb-4" />
        </Link>
        
        <div className="upload-file-container mb-6 mx-4 sm:mx-8 lg:mx-32">
          <div className="border-2 border-dashed border-gray-300 text-center p-10">
            <h2 className="text-xl mb-2">Upload Files</h2>
            <p className="text-sm text-gray-600 mb-2">
              Add photo receipts for your transactions
            </p>
            <div className="flex items-center justify-center mx-auto border border-black p-2 w-32 h-32">
              <MdFileUpload className="text-5xl sm:text-7xl" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-6 bg-white shadow-md rounded mb-6"
            >
              {message && <p className="text-red-500">{message}</p>}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <select
                  value={userType}
                  onChange={handleUserTypeChange}
                  className="mt-1 block w-full border border-gray-300 p-1 rounded-md shadow-sm focus:ring focus:ring-secondary"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-hover text-white py-2 rounded-md hover:bg-secondary"
              >
                Submit Transaction
              </button>
            </form>
          </div>
      
        </div>
        
        {userType === "seller" && (
          <div className="images-container mb-6 mx-4 sm:mx-8 lg:mx-32">
            <h2 className="text-2xl mb-4">Your Uploaded Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactions.map((transaction, idx) => (
                transaction.sellerUploaded && transaction.sellerImageUrl && (
                  <div key={idx} className="border rounded-lg p-2">
                    <Image
                      src={transaction.sellerImageUrl}
                      alt={`Uploaded image for transaction ${idx + 1}`}
                      className="w-full h-auto rounded-md"
                    />
                    <p className="mt-2 text-sm">Uploaded on: {formatDate(transaction.date)}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {isLoading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-black">Date</th>
                <th className="p-2 text-black">Status</th>
                <th className="p-2 text-black">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
               transactions
               .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
               .slice(0, 4) 
               .map((transaction, idx) => (
                  <tr key={idx} className="border-b border-primary">
                    <td className="p-2">{formatDate(transaction.date)}</td>
                    <td className="p-2">
                      <span
                        className={`inline-block px-3 py-2 rounded-lg text-white ${
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
                    <td className="p-2">{transaction.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-2 text-center">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
          
        )}
      </div>
      

     
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Success</h2>
            <p>{message}</p>
            <button onClick={closeModal} className="mt-4 bg-hover text-white px-4 py-2 rounded hover:bg-secondary">
              Close
            </button>
          </div>
        </div>
      )}
      {isErrorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Error</h2>
            <p>{message}</p>
            <button onClick={closeErrorModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default TransactionsPage;
