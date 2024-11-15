// "use client";
// import { FC, useEffect, useState, useCallback } from "react";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// interface Location {
//   lat: number;
//   lng: number;
// }

// const defaultCenter = {
//   lat: 0,
//   lng: 0
// };

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const LocationMap: FC = () => {
//   const [currentLocation, setCurrentLocation] = useState<Location>(defaultCenter);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//           setIsLoading(false);
//         },
//         (error) => {
//           setError('Error getting location: ' + error.message);
//           setIsLoading(false);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by your browser');
//       setIsLoading(false);
//     }
//   }, []);

//   const onLoad = useCallback((map: google.maps.Map) => {
//     const bounds = new window.google.maps.LatLngBounds(currentLocation);
//     map.fitBounds(bounds);
//   }, [currentLocation]);

//   if (isLoading) {
//     return (
//       <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg ml-10 mr-4 lg:ml-[90px]">
//         <p className="text-gray-600">Loading map...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg ml-10 mr-4 lg:ml-[40px]">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full rounded-lg overflow-hidden ml-10 mr-4 lg:ml-[220px] lg:mr-[-16px]">
//       <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
//         <GoogleMap
//           mapContainerStyle={{
//             ...containerStyle,
//             width: '88%',
//           }}
//           center={currentLocation}
//           zoom={15}
//           onLoad={onLoad}
//           options={{
//             zoomControl: true,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: true,
//           }}
//         >
//           <Marker position={currentLocation} />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default LocationMap;



"use client";
import { FC, useEffect, useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

const defaultCenter = {
  lat: 0,
  lng: 0
};

const containerStyle = {
  width: '100%',
  height: '400px'
};

const LocationMap: FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          setError('Error getting location: ' + error.message);
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(currentLocation);
    map.fitBounds(bounds);
  }, [currentLocation]);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden lg:z-0">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={15}
          onLoad={onLoad}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          <Marker position={currentLocation} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationMap;







// "use client";
// import { FC, useEffect, useState, useCallback } from "react";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// interface Location {
//   lat: number;
//   lng: number;
// }

// const defaultCenter = {
//   lat: 0,
//   lng: 0
// };

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const LocationMap: FC = () => {
//   const [currentLocation, setCurrentLocation] = useState<Location>(defaultCenter);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//           setIsLoading(false);
//         },
//         (error) => {
//           setError('Error getting location: ' + error.message);
//           setIsLoading(false);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by your browser');
//       setIsLoading(false);
//     }
//   }, []);

//   const onLoad = useCallback((map: google.maps.Map) => {
//     const bounds = new window.google.maps.LatLngBounds(currentLocation);
//     map.fitBounds(bounds);
//   }, [currentLocation]);

//   if (isLoading) {
//     return (
//       <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
//         <p className="text-gray-600">Loading map...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full rounded-lg overflow-hidden">
//       <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={currentLocation}
//           zoom={15}
//           onLoad={onLoad}
//           options={{
//             zoomControl: true,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: true,
//           }}
//         >
//           <Marker position={currentLocation} />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default LocationMap;