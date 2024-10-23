"use client";

import React from 'react';
import { Users, ShoppingCart, Scale } from 'lucide-react';
import { Card, CardContent } from '../Ui';
import useUsersData from '@/app/hooks/useUsersData';

interface User {
  id: number;
  role: 'seller' | 'buyer' | 'lawyer';
}

const UsersStats = () => {
  const { usersData, loading, error } = useUsersData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalSellers = usersData ? (usersData as User[]).filter(user => user.role === 'seller').length : 0;
  const totalBuyers = usersData ? (usersData as User[]).filter(user => user.role === 'buyer').length : 0;
  const totalLawyers = usersData ? (usersData as User[]).filter(user => user.role === 'lawyer').length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
     
      <Card className="bg-white w-full h-36 shadow-xl transition-transform transform hover:scale-105"> {/* Increased size and shadow */}
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Buyers</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalBuyers}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

    
      <Card className="bg-white w-full h-36 shadow-xl transition-transform transform hover:scale-105"> {/* Increased size and shadow */}
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sellers</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalSellers}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

   
      <Card className="bg-white w-full h-36 shadow-xl transition-transform transform hover:scale-105"> {/* Increased size and shadow */}
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Lawyers</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalLawyers}</h3>
            </div>
            <div className="p-3 bg-amber-100 rounded-full">
              <Scale className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersStats;