"use client";
import { formatDate } from "@/app/utils/formatDate";
import Link from "next/link";
import useTransactions from "@/app/hooks/useTransactions";

import ProgressBar from "@/app/components/Progressbar";
// import SideBarPwa from "@/app/components/Sidebarpwa";

const TransactionsDisplay = () => {
  const { transactions, isLoading, error } = useTransactions();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* <SideBarPwa userRole={""} /> */}

      <div className="flex-grow p-6 md:mr-4 lg:mr-0">
        <header className="flex justify-center items-center p-4 w-full max-w-5xl">
          <h1 className="custom-header text-center text-xl md:text-2xl lg:text-4xl font-bold text-primary mt-[-50px]">
            Transactions
          </h1>
        </header>

        <ProgressBar />

        <div className="w-full max-w-5xl mt-20 mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <Link href="/transactions/history-of-transactions">
              <button className="custom-button bg-hover text-white py-2 px-4 rounded-lg mb-2 md:mb-0">
                History Of Transactions
              </button>
            </Link>
            <Link href="/transactions/upload_transactions">
              <button className="custom-button bg-hover text-white py-2 px-4 rounded-lg">
                Upload Payments
              </button>
            </Link>
            <Link href="/transactions/history-of-transactions">
              <button className="custom-button bg-hover text-white py-2 px-4 rounded-lg mt-3">
                View More
              </button>
            </Link>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-black text-sm md:text-base lg:text-lg">Date</th>
                <th className="p-2 text-black text-sm md:text-base lg:text-lg">Status</th>
                <th className="p-2 text-black text-sm md:text-base lg:text-lg">Amount</th>
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
              ) : transactions.length > 0 ? (
                transactions
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((transaction, idx) => (
                    <tr key={idx} className="border-b border-primary">
                      <td className="p-2 text-sm md:text-base lg:text-lg">{formatDate(transaction.date)}</td>
                      <td className="p-2 text-sm md:text-base lg:text-lg">
                        <span
                          className={`px-2 py-2 rounded-lg text-white ${
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
        </div>
      </div>
    </div>
  );
};

export default TransactionsDisplay;
