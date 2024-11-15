'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ContractDrafting: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white p-4 md:pl-10 md:p-8 lg:pl-2 lg:p-1 ml-[10%]">
    <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full h-64 md:h-96 mb-20">
          <Image 
            src="/media/transparent.png" 
            alt="Contract Drafting Illustration" 
            width={750} 
            height={800} 
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center mt-6 md:mt-0">
        <div className="mb-6">
          <Link href="/lawyer/chatroom-page" className="text-secondary text-[18px] hover:foreground">
            Link to the Negotiation
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-start">
          <input type="checkbox" id="agreement" className="mr-2" />
          <label htmlFor="agreement" className="text-[18px] text-primary">
            Creating of the Agreement and Conditions
          </label>
        </div>

        <Link href="/lawyer/agreements">
          <button className="bg-foreground text-white w-[60%] py-2 rounded-lg hover:bg-primary hover:text-foreground hover:border border-foreground transition duration-300 text-[16px] md:text-[20px] lg:text-[22px]">
            Start to draft contract
          </button>
        </Link>

      </div>
    </div>
  );
};

export default ContractDrafting;

