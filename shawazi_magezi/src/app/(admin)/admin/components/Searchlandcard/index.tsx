"use client";

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader } from '../Ui';
import useParcelNumber from '../../../../hooks/useParcelNumber';
import { LandPlot } from '@/app/utils/type';

const LandDetailsChart = () => {
  const { landPlotsData, loading, error } = useParcelNumber();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalLandPlots = landPlotsData ? landPlotsData.length : 0;

  const locationCounts = (landPlotsData as LandPlot[]).reduce((acc, plot) => {
    const location = plot.location_name;
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>); 

  const data = Object.keys(locationCounts).map(location => ({
    subject: location,
    A: locationCounts[location],
    fullMark: totalLandPlots,
  }));

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <h2 className="text-xl font-bold">Land Plot Distribution by Location</h2>
        <p className="text-sm text-gray-500">Total Land Plots: {totalLandPlots}</p>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              <Radar name="Land Distribution" dataKey="A" stroke="#E4960E" fill="#508408" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandDetailsChart;













