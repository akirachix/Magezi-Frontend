"use client";

import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader } from '../Ui';
import useUsersData from '../../../../hooks/useUsersData';

interface User {
  id: number;
  role: 'seller' | 'buyer' | 'lawyer';

}

const UsersChart = () => {
  const { usersData, loading, error } = useUsersData();

  useEffect(() => {
    console.log('usersData:', usersData);
  }, [usersData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalSellers = usersData ? (usersData as User[]).filter(user => user.role === 'seller').length : 0;
  const totalBuyers = usersData ? (usersData as User[]).filter(user => user.role === 'buyer').length : 0;
  const totalLawyers = usersData ? (usersData as User[]).filter(user => user.role === 'lawyer').length : 0; 

  const data = [
    { name: 'Sellers', value: totalSellers },
    { name: 'Buyers', value: totalBuyers },
    { name: 'Lawyers', value: totalLawyers } 
  ];

  const colors = ['#508408', '#E4960E', '#562B00']; 

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <h2 className="text-xl font-bold">User Distribution</h2>
        <p className="text-sm text-gray-500">Total Users: Sellers ({totalSellers}), Buyers ({totalBuyers}), Lawyers ({totalLawyers})</p>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical">
              <YAxis type="category" dataKey="name" />
              <XAxis type="number" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={30}>
                {
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersChart;
