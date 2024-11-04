'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ContractDrafting: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex-1 flex items-center justify-center md:justify-start lg:justify-center px-4 md:px-6 lg:px-8">
        <div className="relative w-full max-w-[800px] sm:max-w-[600px] md:max-w-[600px] lg:max-w-[750px] h-48 sm:h-56 md:h-72 lg:h-96">
          <Image 
            src="/media/transparent.png" 
            alt="Contract Drafting Illustration" 
            width={750} 
            height={800} 
            className="object-contain w-full h-full"
            priority
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8 px-4 md:px-6 lg:px-8 mt-4 md:mt-0">
        <div className="w-full md:w-[80%] lg:w-[70%]">
          <Link 
            href="/lawyer/chatroom" 
            className="text-secondary hover:text-foreground text-base sm:text-lg md:text-xl lg:text-[18px] transition-colors duration-300"
          >
            Link to the Negotiation
          </Link>
        </div>

        <div className="w-full md:w-[80%] lg:w-[70%]">
          <Link href="/lawyer/agreements" className="block">
            <button className="bg-foreground text-white w-full py-2.5 sm:py-3 rounded-lg hover:bg-primary hover:text-white hover:border border-foreground transition duration-300 text-base sm:text-lg md:text-xl lg:text-[22px]">
              Start to draft contract
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContractDrafting;