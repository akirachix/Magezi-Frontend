'use client'
import React, { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  // Example useEffect to simulate fetching transactions from an API
  useEffect(() => {
    // Simulated data fetch
    const fetchTransactions = async () => {
      const data = [
        {
          
        },
        // More transaction objects...
      ];
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold text-brown-600">Transactions</h1>
      </header>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border border-green-600 p-2 rounded-lg w-1/3"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="p-4 text-gray-600">Name</th>
              <th className="p-4 text-gray-600">Date</th>
              <th className="p-4 text-gray-600">Status</th>
              <th className="p-4 text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-200">
                <td className="p-4">{transaction.name}</td>
                <td className="p-4">{transaction.date}</td>
                <td className="p-4">{transaction.status}</td>
                <td className="p-4">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-6">
        <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
          View More
        </button>
      </div>
    </div>
  );
};

export default Transactions;
