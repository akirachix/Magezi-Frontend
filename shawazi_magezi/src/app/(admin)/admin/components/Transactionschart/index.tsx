"use client";

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from '../Ui';
import useTransactionsData from '../../hooks/useTransactions';

interface Transaction {
  id: number; 
  status: 'Pending' | 'Complete';
 
}

const TransactionsChart = () => {
  const { transactionsData, loading, error } = useTransactionsData();
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (transactionsData) {
      const totalTransactions = transactionsData.length;
      const pendingTransactions = transactionsData.filter((transaction: Transaction) => transaction.status === 'Pending').length;
      const completeTransactions = transactionsData.filter((transaction: Transaction) => transaction.status === 'Complete').length;

      setChartData([
        { name: 'Pending', value: pendingTransactions },
        { name: 'Complete', value: completeTransactions },
        { name: 'Total', value: totalTransactions }
      ]);
    }
  }, [transactionsData]);

  const COLORS = ['#508408', '#E4960E', '#562B00'];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <h2 className="text-xl font-bold">Transactions Overview</h2>
        <p className="text-sm text-gray-500">
          Total Transactions: {chartData.length > 0 ? chartData[2].value : 0}
        </p>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsChart;

