"use client"
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from '../Ui';
import useAgreementsData from '../../hooks/useAgreementData';
import dayjs from 'dayjs'; 
import advancedFormat from 'dayjs/plugin/advancedFormat'; 
dayjs.extend(advancedFormat); 

interface MonthlyAgreementsData {
  month: string;
  count: number;
}

const AgreementsProgressChart = () => {
  const { agreementsData, loading, error } = useAgreementsData();
  const [monthlyAgreements, setMonthlyAgreements] = useState<MonthlyAgreementsData[]>([]);

  useEffect(() => {
    if (agreementsData) {
      const counts: Record<string, number> = {}; 

      agreementsData.forEach((agreement) => {
        const month = dayjs(agreement.date_created).format('YYYY-MM'); 
        counts[month] = (counts[month] || 0) + 1; 
      });

      const data = Object.keys(counts).map((month) => ({
        month: dayjs(month).format('MMMM YYYY'),
        count: counts[month],
      }));

      setMonthlyAgreements(data);
    }
  }, [agreementsData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full md:w-3/4 lg:w-full h-[400px] mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold">Agreements Progress</h2>
        <p className="text-sm text-gray-500">
          Total Agreements: {monthlyAgreements.reduce((acc, curr) => acc + curr.count, 0)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyAgreements}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#E4960E" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgreementsProgressChart;























