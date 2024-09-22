import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface UsersChartProps {
  data: Array<{ month: string; sellers: number; buyers: number }>;
}

const UsersChart: React.FC<UsersChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-black text-lg font-bold mb-2"></h2>
      <BarChart width={400} height={300} data={data} className="mx-4">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sellers" stackId="a" fill="#3182CE" />
        <Bar dataKey="buyers" stackId="a" fill="#E53E3E" />
      </BarChart>
    </div>
  );
};

export default UsersChart;
