'use client'
import React, { useState, useEffect } from 'react';
import { MdFileUpload } from "react-icons/md";
import Image from 'next/image';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions'); 
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
        setIsLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-brown-600 text-center">Transactions</h1>

        <div className="mb-6">
          <h2 className="text-xl mb-2">Upload Files</h2>
          <p className="text-sm text-gray-600 mb-2">Add photo receipts for your transactions</p>
          <div className="border-2 border-dashed border-gray-300 p-8 text-center">
            <div className='flex items-center justify-center ml-auto mr-auto border border-black p-2 w-32 h-32'>
            <MdFileUpload className='text-7xl text-center'/>
            </div>
            {/* <p className='mt-2'>Drop files here or click to select <span className='underline'>files to upload</span></p> */}
            <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        onChange={(e) => {/* Handle file selection */}} 
    />
    <label htmlFor="file-upload" className='underline cursor-pointer mt-2'>
       
    </label>
    <p className='mt-2'>
        Drop files here or click to select <label htmlFor="file-upload" className='underline cursor-pointer'>files to upload</label>
    </p>
          </div>
        </div>

        {isLoading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Amount</th>
              </tr>
            </thead>
            {/* <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">
                    <div>{transaction.name}</div>
                    <div className="text-sm text-gray-600">{transaction.description}</div>
                  </td>
                  <td className="p-2">{transaction.date}</td>
                  <td className="p-2">{transaction.status}</td>
                  <td className="p-2">{transaction.amount}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        )}

        <div className="mt-4 text-right">
          <button className="bg-green-500 text-white px-4 py-2 rounded">View More</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;