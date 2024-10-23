"use client";
import React, { useState } from "react";
import { formatDate } from "@/app/utils/formatDate";
import useTransactions from "@/app/hooks/useTransactions";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import LawyerSidebar from "../../components/lawyerSidebar";



interface Transaction {
  date: string;
  status: string;
  unique_code: string;
  amount: string | number;
}

const ITEMS_PER_PAGE = 7; 

const Transactionss = () => {
  const { transactions, isLoading, error } = useTransactions();
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const typedTransactions: Transaction[] = transactions as Transaction[];

  const filteredTransactions = typedTransactions.filter((transaction) => {
    const statusMatch =
      !filterStatus ||
      transaction.status.toLowerCase() === filterStatus.toLowerCase();
    return statusMatch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleReset = () => {
    setFilterStatus("");
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
     <LawyerSidebar/>
      <div className="flex-1 p-2 sm:p-4 min-h-screen bg-white ml-0 md:ml-64 lg:ml-72">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          <header className="py-2 sm:py-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-center">
              Transactions
            </h1>
          </header>

          <div className="flex flex-col gap-3">
            <Link href="/lawyer/transactions/transactions" className="w-fit">
              <IoArrowBackOutline className="text-xl sm:text-2xl md:text-3xl hover:bg-secondary border-2 p-1" />
            </Link>

            <div className="flex flex-col gap-3 w-full max-w-[350px]">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-hover px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg w-full text-sm sm:text-base"
              >
                <option value="">All Statuses</option>
                <option value="Complete">Complete</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                onClick={handleReset}
                className="border-hover border-2 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-secondary w-[180px]"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto shadow-sm rounded-lg">
            <table className="w-full text-left border-collapse min-w-[300px] sm:min-w-[500px] bg-white">
              <thead className="bg-hover">
                <tr className="border-b">
                  <th className="p-2 sm:p-4 text-white text-xs sm:text-sm md:text-base lg:text-lg">
                    Date
                  </th>
                  <th className="p-2 sm:p-4 text-white text-xs sm:text-sm md:text-base lg:text-lg">
                    Status
                  </th>
                  <th className="p-2 sm:p-4 text-white text-xs sm:text-sm md:text-base lg:text-lg">
                    Amount
                  </th>
                  <th className="p-2 sm:p-4 text-white text-xs sm:text-sm md:text-base lg:text-lg">
                    Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-2 sm:p-4">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={4} className="p-2 sm:p-4">
                      Error: {error}
                    </td>
                  </tr>
                ) : paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((transaction, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-primary hover:bg-gray-50"
                    >
                      <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="p-2 sm:p-4">
                        <span
                          className={`inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-white text-xs sm:text-sm md:text-base ${
                            transaction.status === "Complete"
                              ? "bg-hover"
                              : transaction.status === "Pending"
                              ? "bg-secondary"
                              : "bg-red-500"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">
                        {transaction.amount}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">
                        {transaction.unique_code}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-2 sm:p-4">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-primary rounded text-white hover:bg-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactionss;











