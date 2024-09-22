import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PaymentsChartProps {
  data: Array<{ month: string; ongoing: number; completed: number }>;
}

const PaymentsChart: React.FC<PaymentsChartProps> = ({ data }) => {
  return (
    <div className=" p-4 rounded-lg">
      <LineChart width={400} height={300} data={data} className="mx-4">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ongoing" stroke="#48BB78" />
        <Line type="monotone" dataKey="completed" stroke="#E53E3E" />
      </LineChart>
    </div>
  );
};

export default PaymentsChart;
