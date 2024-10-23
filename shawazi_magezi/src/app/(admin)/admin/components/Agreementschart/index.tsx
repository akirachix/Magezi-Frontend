"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader } from '../Ui';
import useAgreementsData from '@/app/hooks/useAgreementData';
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

  const totalAgreements = monthlyAgreements.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-16'>
<div className='mt-40'>
  <Card className="w-full bg-[#508408] text-white">
    <CardHeader>
      <h2 className="text-xl text-white font-bold text-center">Total Agreements</h2>
    </CardHeader>
    <CardContent>
      <p className="text-2xl text-center">{totalAgreements}</p>
    </CardContent>
  </Card>
</div>
      <div id="agreements-progress-chart" className="w-full h-[400px]">
        <Card className="w-full h-[400px] mx-auto">
          <CardHeader>
            <h2 className="text-xl font-bold text-center">Agreements Progress</h2>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAgreements}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#E4960E" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgreementsProgressChart;