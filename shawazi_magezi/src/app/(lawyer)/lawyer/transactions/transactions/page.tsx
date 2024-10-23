"use client";
import { formatDate } from "@/app/utils/formatDate";
import Link from "next/link";
import useTransactions from "@/app/hooks/useTransactions";
import LawyerSidebar from "../../components/lawyerSidebar";



const TransactionsDisplay = () => {
  const { transactions, isLoading, error } = useTransactions();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
        <LawyerSidebar/>
      </div>

      <div className="flex-1 p-4 md:p-6 lg:p-8 md:pl-8 lg:pl-10">
        <header className="flex justify-center items-center p-4 w-full max-w-5xl">
          <h1 className="custom-header text-center text-xl md:text-3xl lg:text-4xl font-bold text-primary mt-[-30px] md:mt-[-40px] lg:mt-[-50px]">
            Transactions
          </h1>
        </header>

        <div className="w-full max-w-5xl mt-12 md:mt-16 lg:mt-20 mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-3 mb-6">
            <Link href="/lawyer/transactions/history-of-transactions">
              <button className="custom-button bg-hover text-white py-2 px-4 rounded-lg w-full md:w-auto">
                History Of Transactions
              </button>
            </Link>
            <Link href="/lawyer/transactions/history-of-transactions">
              <button className="custom-button bg-hover text-white py-2 px-4 rounded-lg w-full md:w-auto">
                View More
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[768px]">
              <thead className="bg-hover">
                <tr className="border-b">
                  <th className="p-3 text-white text-sm md:text-base lg:text-lg">Date</th>
                  <th className="p-3 text-white text-sm md:text-base lg:text-lg">Status</th>
                  <th className="p-3 text-white text-sm md:text-base lg:text-lg">Amount</th>
                  <th className="p-3 text-white text-sm md:text-base lg:text-lg">Code</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td className="p-3" colSpan={4}>Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td className="p-3" colSpan={4}>Error: {error}</td>
                  </tr>
                ) : transactions.length > 0 ? (
                  transactions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map((transaction, idx) => (
                      <tr key={idx} className="border-b border-primary">
                        <td className="p-3 text-sm md:text-base lg:text-lg">{formatDate(transaction.date)}</td>
                        <td className="p-3">
                          <span className={`inline-block w-24 px-2 py-2 rounded-lg text-white text-center text-sm md:text-base ${
                            transaction.status === "Complete" ? "bg-hover" :
                            transaction.status === "Pending" ? "bg-secondary" :
                            transaction.status === "rejected" ? "bg-red-500" : ""
                          }`}>
                            {transaction.status === "Complete" ? "Complete" : transaction.status}
                          </span>
                        </td>
                        <td className="p-3 text-sm md:text-base lg:text-lg">{transaction.amount}</td>
                        <td className="p-3 text-sm md:text-base lg:text-lg">{transaction.unique_code}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td className="p-3" colSpan={4}>No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsDisplay;