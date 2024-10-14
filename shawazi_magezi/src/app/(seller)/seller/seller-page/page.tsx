"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import SideBar from "@/app/components/SideBarPwa";
import { Transaction } from "@/app/utils/types"; 
// import NotificationBell from "@/app/components/NotificationBell";
// import Notifications from "@/app/components/NotificationBell";
import SellerNotifications from "@/app/components/NotificationBell";

const SellerPage: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [errorTransactions, setErrorTransactions] = useState<string | null>(null);
  // const [sellerPhoneNumber, setSellerPhoneNumber] = useState<string>("");

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
        setErrorTransactions("Failed to load transactions. Please try again later.");
        console.error(error);
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    // const fetchUserData = async () => {
    //   try {
    //     const response = await fetch("https://shawazi-6941c000049b.herokuapp.com/api/users/"); // Adjust the endpoint as necessary
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch user data");
    //     }
    //     const data = await response.json();
    //     setSellerPhoneNumber(data.phoneNumber); // Adjust according to your data structure
    //   } catch (error) {https://shawazi-6941c000049b.herokuapp.com  
    //     console.error(error);
    //   }
    // };

    fetchTransactions();
    // fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mt-10">
      <SideBar userRole={""} />

      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <SellerNotifications/>
        </div>

        <header className="mb-8">
          <h2 className="text-2xl font-semibold text-primary lg:text-3xl">Hello, Welcome to Shawazi</h2>
        </header>

        <section className="grid grid-cols-1 h-[15%] sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
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
      </div>
    </div>
  );
};

export default SellerPage;
