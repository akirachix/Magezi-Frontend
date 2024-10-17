"use client"

import React from 'react';

import LandDetailsChart from '../components/Searchlandcard';
import TransactionsChart from '../components/Transactionschart';
import UsersChart from '../components/Userschart';
import Sidebar from '../components/Sidebar';
import AgreementsChart from '../components/Agreementschart';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-10 p-4 ml-80 mt-10 mr-20">
      <h1 className='text-2xl mt-8 text-center mr-[40%]' >  <b>Hello, Welcome to Shawazi Dashboard </b></h1>
      <Sidebar setActiveChart={() => {}} />

      <AgreementsChart />
      <LandDetailsChart />
      <TransactionsChart />
      <UsersChart />
    </div>
  );
};

export default Dashboard;


