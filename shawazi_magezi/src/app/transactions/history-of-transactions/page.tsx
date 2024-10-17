'use client';
import React, { useState } from 'react';
import { formatDate } from "@/app/utils/formatDate";
import useTransactions from "@/app/hooks/useTransactions";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import SideBar from '@/app/components/Sidebarpwa';

const Transactionss = () => {
  const { transactions, isLoading, error } = useTransactions();
  const [filterStatus, setFilterStatus] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const statusMatch = !filterStatus || transaction.status.toLowerCase() === filterStatus.toLowerCase();
    return statusMatch;
  });

  const handleReset = () => {
    setFilterStatus("");
  };

  return (
    
    <div className="flex flex-col items-center mt-[-50px] p-6 min-h-screen bg-white ml-0 md:ml-48">
     

      <header className="flex justify-center items-center p-4 w-full max-w-5xl bg-white">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          Transactions
        </h1>
      </header>

      <div className="mb-4 flex flex-wrap items-center justify-center mt-6 w-full gap-8 bg-white">
        <Link href="/transactions/transactions">
          <IoArrowBackOutline className="border-2 text-black hover:bg-secondary text-[34px] ml-[-240px]" />
        </Link>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-hover px-4 bg-white py-3 rounded-lg w-full sm:w-80 md:w-96"
        >
          <option value="">All Statuses</option>
          <option value="complete">Complete</option>
          <option value="Pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          onClick={handleReset}
          className="border-hover border-2 text-black px-4 py-1 rounded w-32 hover:bg-secondary"
        >
          Reset Filters
        </button>
      </div>

      <div className="w-full max-w-5xl mt-10 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-black text-sm sm:text-base md:text-lg lg:text-xl">Date</th>
              <th className="p-2 text-black text-sm sm:text-base md:text-lg lg:text-xl">Status</th>
              <th className="p-2 text-black text-sm sm:text-base md:text-lg lg:text-xl">Amount</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="p-2" colSpan={3}>
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="p-2" colSpan={3}>
                  Error: {error}
                </td>
              </tr>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, idx) => (
                <tr key={idx} className="border-b border-primary bg-white">
                  <td className="p-2 text-sm sm:text-base md:text-lg lg:text-xl">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-2 rounded-lg text-white text-xs sm:text-sm md:text-base ${
                        transaction.status === "Complete"
                          ? "bg-hover"
                          : transaction.status === "Pending"
                          ? "bg-secondary"
                          : transaction.status === "rejected"
                          ? "bg-red-500"
                          : ""
                      }`}
                    >
                      {transaction.status === "Complete" ? "Complete" : transaction.status}
                    </span>
                  </td>
                  <td className="p-2 text-sm sm:text-base md:text-lg lg:text-xl">
                    {transaction.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2" colSpan={3}>
                  No transactions found for the selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>

      <SideBar userRole={""} />

    </div>
  );
};

export default Transactionss;
