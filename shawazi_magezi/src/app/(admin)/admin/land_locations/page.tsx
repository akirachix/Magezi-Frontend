"use client";

import React, { useCallback, useRef, useState, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Card, CardContent, CardHeader } from '../components/Ui';
import useParcelNumber from '@/app/hooks/useParcelNumber';
import { LandPlot } from '@/app/utils/types';
import { MapPin } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const KenyaLandMap = () => {
  const { landPlotsData, loading, error } = useParcelNumber();
  const [selectedPlot, setSelectedPlot] = useState<LandPlot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlots, setFilteredPlots] = useState<LandPlot[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [googleMaps, setGoogleMaps] = useState<typeof google | null>(null);

  
  const center = useMemo(() => ({
    lat: -1.286389,
    lng: 36.817223,
  }), []);

  const mapContainerStyle = {
    width: '100%',
    height: 'calc(100vh - 150px)',
    border: '2px solid #562B00', // Green border around the map
    borderRadius: '5px',
  };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    gestureHandling: 'cooperative',
    zoom: 7,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#444444' }],
      },
    ],
  };

  const createMapMarker = (fillColor: string): google.maps.Icon | null => {
    if (!googleMaps) return null;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="${fillColor}" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="${fillColor}" stroke="white"/>
        <circle cx="12" cy="10" r="3" fill="white"/>
      </svg>
    `;

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
      scaledSize: new google.maps.Size(36, 36),
      anchor: new google.maps.Point(18, 36),
    };
  };

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setGoogleMaps(google);
      mapRef.current = map;

      const kenyaBounds = {
        north: 5.0,
        south: -4.63,
        east: 41.85,
        west: 34.95,
      };

      map.setOptions({
        restriction: {
          latLngBounds: kenyaBounds,
          strictBounds: true,
        },
      });

      const bounds = new google.maps.LatLngBounds();

      setFilteredPlots(landPlotsData || []);

      if (landPlotsData) {
        landPlotsData.forEach((plot: LandPlot) => {
          if (plot.latitude && plot.longitude) {
            bounds.extend({
              lat: plot.latitude,
              lng: plot.longitude,
            });
          }
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds);
        } else {
          map.setCenter(center);
        }
      }
    },
    [landPlotsData, center] 
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    const filtered = (landPlotsData as LandPlot[]).filter((plot) =>
      plot.location_name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredPlots(filtered);
  };

  const selectPlot = (plot: LandPlot) => {
    setSelectedPlot(plot);
    mapRef.current?.panTo({
      lat: plot.latitude, 
      lng: plot.longitude,
    });
  };

  if (loading) return (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-2">
        <MapPin className="w-8 h-8 animate-bounce text-primary" />
        <p className="text-gray-600">Loading map data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-50">
      <p className="text-red-600">Error loading map: {error}</p>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar setActiveChart={() => { }} />
      <div className="w-full md:ml-10 p-4">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-3xl mt-12 font-bold">Land Plots in Kenya</h2>
            </div>
            <p className="text-sm text-gray-500">
              Total Plots: {filteredPlots.length || 0}
            </p>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 mb-2 border border-green-500 rounded"
            />
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded mb-2">
              {filteredPlots.map((plot) => (
                <div
                  key={plot.id}
                  onClick={() => selectPlot(plot)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {plot.location_name}
                </div>
              ))}
            </div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={7}
                options={options}
                onLoad={onLoad}
              >
                {filteredPlots.map((plot) => {
                  if (plot.latitude && plot.longitude) {
                    const icon = createMapMarker('#E4960E'); 
                    return (
                      <Marker
                        key={plot.id}
                        position={{
                          lat: plot.latitude,  // No need to parse, it's already a number
                          lng: plot.longitude,
                        }}
                        onClick={() => selectPlot(plot)}
                        icon={icon ? icon : undefined}
                      />
                    );
                  }
                  return null;
                })}

                {selectedPlot && (
                  <InfoWindow
                    position={{
                      lat: selectedPlot.latitude,  // No need to parse, it's already a number
                      lng: selectedPlot.longitude,
                    }}
                    onCloseClick={() => setSelectedPlot(null)}
                  >
                    <div className="p-3 min-w-[200px]">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <h3 className="font-bold text-lg">
                          {selectedPlot.location_name}
                        </h3>
                      </div>
                      <p className="text-sm">
                        Owner: <span className="font-medium">{selectedPlot.owner_name}</span>
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KenyaLandMap;