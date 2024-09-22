'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '../components/Ui';
import UsersChart from '../components/UsersChart';
import ContractsChart from '../components/ContractsChart';
import NewContractsChart from '../components/NewContractsChart';
import PaymentsChart from '../components/PaymentsChart';
import useDashboardData from '../hooks/useDashboardData';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  const { usersData, contractsData, newContractsData, paymentsData, loading, error } = useDashboardData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!usersData || !contractsData || !newContractsData || !paymentsData) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl mt-12 mb-12 text-black ml-60">Welcome back, <b>Oliver</b></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-80">
          <Card className="bg-gray-200">
            <CardHeader className="text-black text-lg">Number of Users Per Month</CardHeader>
            <CardContent>
              <UsersChart data={usersData} />
            </CardContent>
          </Card>
          <Card className="bg-gray-200">
            <CardHeader className="text-black text-lg">Contracts Overview</CardHeader>
            <CardContent>
              <ContractsChart data={contractsData} />
            </CardContent>
          </Card>
          <Card className="bg-gray-200">
            <CardHeader className="text-black text-lg">New Contracts Per Month</CardHeader>
            <CardContent>
              <NewContractsChart data={newContractsData} />
            </CardContent>
          </Card>
          <Card className="bg-gray-200">
            <CardHeader className="text-black text-lg">Ongoing Payments Per Month</CardHeader>
            <CardContent>
              <PaymentsChart data={paymentsData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
