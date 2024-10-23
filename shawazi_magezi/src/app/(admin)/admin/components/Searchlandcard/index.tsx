"use client";

import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../Ui';
import useParcelNumber from '@/app/hooks/useParcelNumber';
import { LandPlot } from '@/app/utils/type';

const TopLocationsDisplay = () => {
  const { landPlotsData, loading, error } = useParcelNumber();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalLandPlots = landPlotsData ? landPlotsData.length : 0;


  const locationCounts = (landPlotsData as LandPlot[]).reduce((acc, plot) => {
    const location = plot.location_name;
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);


  const topLocations = Object.entries(locationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([location, count]) => ({
      location,
      count,
      percentage: ((count / totalLandPlots) * 100).toFixed(1)
    }));

 
  const getGradientColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-[#508408] to-[#508408]', // Green
      'bg-gradient-to-r from-[#E4960E] to-[#E4960E]', // Gold
      'bg-gradient-to-r from-[#562B00] to-[#562B00]', // Brown
      'bg-gradient-to-r from-amber-500 to-amber-600', // Amber
      'bg-gradient-to-r from-[#E15203] to-[#E15203]', // Orange
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full p-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Top 6 Locations</h2>
          <p className="text-sm text-gray-500">Total Land Plots: {totalLandPlots}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topLocations.map((item, index) => (
              <div 
                key={item.location} 
                className="relative overflow-hidden rounded-lg shadow-sm border border-gray-200"
              >
                <div className={`${getGradientColor(index)} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold opacity-90">Location</p>
                      <h3 className="text-lg font-bold truncate">{item.location}</h3>
                    </div>
                    <MapPin className="h-6 w-6 opacity-80" />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-bold">{item.count}</p>
                        <p className="text-sm opacity-90">Land Plots</p>
                      </div>
                      <p className="text-lg font-semibold">{item.percentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopLocationsDisplay;