import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const SecureTransactions = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      
      <div className="mb-6">
        <Image 
          src="/images/securetransactions.png" 
          alt="Secure Land Transactions"
          width={500} 
          height={700} 
          className="max-w-full h-auto w-[200px] sm:w-3/4 md:w-[350px] lg:w-[320px]"
        />
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[35px] font-bold text-primary text-center mb-4">
        Enhancing Transparency In Land Aquistion
      </h1>

      <p className="text-base sm:text-lg md:text-xl lg:text-[18px] text-black mb-8 mx-4 sm:mx-8 lg:mx-0 text-center">
      We provide clear and open processes in land acquisition by fostering trust and accountability for all stakeholders.
        <br />
      </p>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
        <Link href="/register">
          <button className="w-full sm:w-48 px-6 py-2 border-2 border-hover text-hover rounded-lg hover:bg-green-50">
            Skip
          </button>
        </Link>

        <Link href="/register">
          <button className="w-full sm:w-48 px-6 py-2 bg-hover text-white rounded-lg hover:bg-secondary">
            Next
          </button>
        </Link>
      </div>

      <div className="flex space-x-4 mt-5 sm:mt-20">
        <div className="w-3 h-3 bg-yellow-500 mt-[-35px] rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 mt-[-35px] rounded-full"></div>

      </div>
    </div>
  );
};

export default SecureTransactions;