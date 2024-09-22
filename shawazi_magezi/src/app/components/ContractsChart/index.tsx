
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ContractsChartProps {
  data: Array<{ month: string; completed: number; ongoing: number }>;
}

const ContractsChart: React.FC<ContractsChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      
      <BarChart width={400} height={300} data={data} className="mx-4">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#9F7AEA" />
        <Bar dataKey="ongoing" fill="#48BB78" />
      </BarChart>
    </div>
  );
};

export default ContractsChart;
