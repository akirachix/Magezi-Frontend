import { useState } from 'react';

// Transactions Page Component
export default function TransactionsDisplay() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">

      <header className="flex justify-between items-center p-4 bg-white shadow-md w-full max-w-5xl">
        <h1 className="text-center text-2xl font-bold text-brown-800">Transactions</h1>
       
      </header>

      {/* Progress Bar */}
      <div className="w-full max-w-5xl mt-6">
        <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-100">
          {['Land Search', 'Agreements', 'Contract', 'Transactions', 'Land Transfer'].map((step, idx) => (
            <div
              key={idx}
              className={`w-1/5 flex flex-col items-center ${idx < 4 ? 'text-green-700' : 'text-brown-700'}`}>
              <div className="bg-brown-800 rounded-full w-6 h-6 mb-2"></div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Table */}
      <div className="w-full max-w-5xl mt-6">
        <div className="flex justify-between mb-4">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg">History Of Transactions</button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg">Upload Payments</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          {/* <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{transaction.name}</td>
                  <td className="p-2">{transaction.date}</td>
                  <td className="p-2">{transaction.status}</td>
                  <td className="p-2">{transaction.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2" colSpan="4">No transactions found</td>
              </tr>
            )}
          </tbody> */}
        </table>
        <div className="flex justify-end mt-4">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg">View More</button>
        </div>
      </div>
    </div>
  );
}

// // Fetch transactions data server-side
// export async function getServerSideProps() {
//   // Replace with your API endpoint
//   const res = await fetch('https://example.com/api/transactions');
//   const transactions = await res.json();

//   // Return the transactions as props
//   return {
//     props: {
//       transactions,
//     },
//   };
// }
