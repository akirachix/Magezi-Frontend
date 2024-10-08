'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ContractDrafting: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white p-4 md:pl-10 md:p-8 lg:pl-2 lg:p-1 ml-[10%]">
    <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full h-64 md:h-96">
          <Image 
            src="/media/transparent.png" 
            alt="Contract Drafting Illustration" 
            width={450} 
            height={600} 
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center mt-6 md:mt-0">
        <div className="mb-6">
          <Link href="/chatroom-page" className="text-secondary hover:underline">
            Link to the Negotiation
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-start">
          <input type="checkbox" id="agreement" className="mr-2" />
          <label htmlFor="agreement" className="text-sm text-gray-700">
            Creating of the Agreement and Conditions
          </label>
        </div>

        <Link href="/Agreements">
          <button 
            className="bg-green-500 text-white py-2 px-8 md:py-3 md:px-24 rounded hover:bg-opacity-90 transition duration-300"
          >
            Start to draft contract
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContractDrafting;

