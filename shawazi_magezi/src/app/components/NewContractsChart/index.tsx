
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface NewContractsChartProps {
  data: Array<{ month: string; contracts: number }>;
}

const NewContractsChart: React.FC<NewContractsChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      
      <BarChart width={400} height={300} data={data} className="mx-4">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="contracts" fill="#F6AD55" />
      </BarChart>
    </div>
  );
};

export default NewContractsChart;
