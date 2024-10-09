"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { MdClose } from "react-icons/md";
import { LandDetails } from "@/app/utils/types";

interface LandDetailsModalProps {
  land: LandDetails | null;
  onClose: () => void;
}

const LandDetailsModal: React.FC<LandDetailsModalProps> = ({ land, onClose }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    console.log("Google Maps API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  if (!land || !land.latitude || !land.longitude) {
    console.error("Invalid land details or missing latitude/longitude.");
    return null; 
  }

  const containerStyle = {
    width: '100%',
    height: '400px', 
  };

  const center = {
    lat: Number(land.latitude),
    lng: Number(land.longitude)
  };

  const formatDate = (dateStr: string | undefined) => {
    return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
  };

  const handleInterestClick = (land: LandDetails) => {
    const notificationData = {
        message: `A buyer is interested in ${land.location_name}!`,
        timestamp: new Date().toISOString(),
    };
    localStorage.setItem("buyerNotification", JSON.stringify(notificationData));
    alert("Notification sent to seller!"); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto relative h-[90vh] w-[90vw] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Close Modal"
        >
          <MdClose className="h-6 w-6 text-gray-500 hover:text-black" />
        </button>
        <h2 className="text-2xl font-bold mb-6">Land Details</h2>
        <div className="mb-6 border-4 border-blue-500 rounded-lg overflow-hidden">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
            onLoad={() => console.log('Google Maps script loaded successfully')}
            onError={(error) => console.error('Failed to load Google Maps script:', error)}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onLoad={() => {
                console.log('Google Map loaded');
                setMapLoaded(true);
              }}
            >
              {mapLoaded && <Marker position={center} />}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="text-xl leading-relaxed space-y-4">
          <p><strong>Location:</strong> {land.location_name || "N/A"}</p>
          <p><strong>Parcel Number:</strong> {land.parcel_number || "N/A"}</p>
          <p><strong>Current Owner:</strong> {land.owner_name || "N/A"}</p>
          <p><strong>Date Acquired:</strong> {formatDate(land.date_acquired)}</p>
          <p><strong>Previous Owner:</strong> {land.previous_owner || "N/A"}</p>
          <p><strong>Address:</strong> {land.address || "N/A"}</p>
          <p><strong>National ID:</strong> {land.national_id || "N/A"}</p>
          <p><strong>Latitude:</strong> {land.latitude}</p>
          <p><strong>Longitude:</strong> {land.longitude}</p>
        </div>
        <button onClick={() => handleInterestClick(land)} className="bg-foreground hover:bg-primary text-white font-bold py-2 px-4 rounded mt-4">
          Interested
        </button>
      </div>
    </div>
  );
};

export default LandDetailsModal;






















// "use client";

// import React, { useEffect } from "react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
// import { MdClose } from "react-icons/md";
// import { LandDetails } from "@/app/utils/types";

// interface LandDetailsModalProps {
//   land: LandDetails | null;
//   onClose: () => void;
// }

// const LandDetailsModal: React.FC<LandDetailsModalProps> = ({ land, onClose }) => {
//   useEffect(() => {
//     console.log("Google Maps API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
//   }, []);

//   if (!land || !land.latitude || !land.longitude) {
//     console.error("Invalid land details or missing latitude/longitude.");
//     return null; 
//   }

//   const containerStyle = {
//     width: '100%',
//     height: '100%',
//   };

//   const formatDate = (dateStr: string | undefined) => {
//     return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
//   };

//   const handleInterestClick = (land: LandDetails) => {
//     const notificationData = {
//         message: `A buyer is interested in ${land.location_name}!`,
//         timestamp: new Date().toISOString(),
//     };
//     localStorage.setItem("buyerNotification", JSON.stringify(notificationData));
//     alert("Notification sent to seller!"); 
// };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto relative h-[80vh] w-[80vw] overflow-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
//           aria-label="Close Modal"
//         >
//           <MdClose className="h-6 w-6 text-gray-500 hover:text-black" />
//         </button>
//         <h2 className="text-2xl font-bold mb-6">Land Details</h2>
//         <div className="h-72 mb-4 border-4 border-blue-500 rounded-lg overflow-hidden">
//           <LoadScript
//             googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
//             onLoad={() => console.log('Google Maps script loaded successfully')}
//             onError={() => console.error('Failed to load Google Maps script')}
//           >
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={{ lat: Number(land.latitude), lng: Number(land.longitude) }}
//               zoom={13}
//               onLoad={() => console.log('Google Map loaded')}
//             >
//               <Marker position={{ lat: Number(land.latitude), lng: Number(land.longitude) }} />
//             </GoogleMap>
//           </LoadScript>
//         </div>
//         <div className="text-xl leading-relaxed space-y-4">
//           <p><strong>Location:</strong> {land.location_name || "N/A"}</p>
//           <p><strong>Parcel Number:</strong> {land.parcel_number || "N/A"}</p>
//           <p><strong>Current Owner:</strong> {land.owner_name || "N/A"}</p>
//           <p><strong>Date Acquired:</strong> {formatDate(land.date_acquired)}</p>
//           <p><strong>Previous Owner:</strong> {land.previous_owner || "N/A"}</p>
//           <p><strong>Address:</strong> {land.address || "N/A"}</p>
//           <p><strong>National ID:</strong> {land.national_id || "N/A"}</p>
//         </div>
//         <button onClick={() => handleInterestClick(land)} className="bg-foreground hover:bg-primary text-white font-bold py-2 px-4 rounded mt-4">
//           Interested
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandDetailsModal;
