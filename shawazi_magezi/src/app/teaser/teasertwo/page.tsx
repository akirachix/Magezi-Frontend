import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const SeamlessTransactions = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
     
      <div className="mb-6">
        <Image 
          src="/images/secure.png" 
          alt="Secure Land Transactions"
          width={400}
          height={400}
          className="max-w-full h-auto"  
        />
      </div>

      <h1 className="text-[40px] sm:text-[50px] md:text-[60px] font-bold text-primary text-center mb-2">
        Seamless Land Transactions
      </h1>

      <p className="text-[16px] sm:text-[20px] md:text-[25px] text-black mb-8 mx-4 sm:mx-8 lg:mx-0">
        Streamline your land buying and selling process with our innovative platform.
        Ensure transaction <span className='block text-center'>is safe, verified, and effortless.</span>
      </p>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-96 mb-8">
      
      <Link href="/register">
        <button className="w-full sm:w-48 px-6 py-2 border-2 border-hover text-hover rounded-lg hover:bg-green-50">
          Skip
        </button>
        </Link>
        
        <Link href="/teaser/teaserthree">
          <button className="w-full sm:w-48 px-6 py-2 bg-hover text-white rounded-lg hover:bg-secondary">
            Next
          </button>
        </Link>
      </div>

      <div className="flex space-x-2 mt-10 sm:mt-20">
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default SeamlessTransactions;