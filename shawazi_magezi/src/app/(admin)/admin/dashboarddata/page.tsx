"use client"

import React from 'react';

import LandDetailsChart from '../components/Searchlandcard';
import TransactionsChart from '../components/Transactionschart';
import Sidebar from '../components/Sidebar';
import UsersStats from '../components/UsersChart';

const Dashboard = () => {
  return (
    <div className='mt-10 ml-80 mr-20 '>
      <h2 className='text-center mt-20 font-bold text-3xl text-[#562B00] mb-10 '> Welcome to the shawazi Dashboard</h2>
      <UsersStats/>
      <Sidebar setActiveChart={() => {}} />

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-10 p-4 ml-20 mt-10 mr-20">
      <TransactionsChart/>
      <LandDetailsChart />
      </div>
    
    

     
    </div>
  );
};

export default Dashboard;












