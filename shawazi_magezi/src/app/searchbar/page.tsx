// "use client";
// import React, { useState, useCallback, useEffect } from "react";
// import { useLandData } from "../hooks/useLandData";
// import LandDetailsModal from "../components/LandDetailModal";
// import SearchErrorModal from "../components/SearchError";

// const LandSearch: React.FC = () => {
//   const [query, setQuery] = useState<string>("");
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
//   const [parcelNumber, setParcelNumber] = useState<string>("");

//   const { land, loading, error } = useLandData(parcelNumber);

//   const handleSearch = useCallback(() => {
//     if (query.trim()) {
//       setParcelNumber(query.trim());
//       setQuery("");
//     }
//   }, [query]);

//   const handleClose = useCallback(() => {
//     setShowModal(false);
//     setShowErrorModal(false);
//     setQuery("");
//     setParcelNumber("");
//   }, []);

//   const handleRetry = useCallback(() => {
//     setShowErrorModal(false);
//     if (parcelNumber) {
//       setQuery(parcelNumber);
//       handleSearch();
//     }
//   }, [handleSearch, parcelNumber]);

//   useEffect(() => {
//     if (!loading && parcelNumber) {
//       if (land) {
//         console.log("Land data received:", land);
//         setShowModal(true);
//         setShowErrorModal(false);
//       } else if (error) {
//         console.log("Error received:", error);
//         setShowErrorModal(true);
//         setShowModal(false);
//       }
//     }
//   }, [land, loading, error, parcelNumber]);

//   console.log("Current state - showModal:", showModal, "land:", land);

//   return (
//     <div className="container mx-auto p-4 ml-4 mr-6 md:ml-6 lg:ml-8">
//       <h1 className="text-xl md:text-2xl font-bold mb-4 text-[#562B00]">
//         Land Parcel Search
//       </h1>
//       <div className="flex flex-col sm:flex-row mb-4">
//         <input
//           type="text"
//           placeholder="Enter Parcel Number"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//           className="flex-grow p-2 border rounded-l mb-2 sm:mb-0 sm:rounded-l-none sm:rounded-l border-r-0"
//         />
//         <button
//           onClick={handleSearch}
//           disabled={loading || !query.trim()}
//           className="bg-[#508408] hover:bg-green-500 text-white font-bold m-auto py-2 px-4 rounded sm:rounded-l-none sm:rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </div>

//       {showModal && land && (
//         <LandDetailsModal 
//           land={land} 
//           onClose={handleClose}
//         />
//       )}

//       {showErrorModal && (
//         <SearchErrorModal
//           onClose={handleClose}
//           onRetry={handleRetry}
//           message={`The parcel number ${parcelNumber} does not match any land record. Please check the number and try again.`}
//         />
//       )}
//     </div>
//   );
// };

// export default LandSearch;














// import React, { useState } from "react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api"; 
// import { MdClose } from "react-icons/md"; 
// import { LandDetails } from "@/app/utils/types";

// interface LandDetailsModalProps {
//   land: LandDetails | null;
//   onClose: () => void;
// }

// const LandDetailsModal: React.FC<LandDetailsModalProps> = ({ land, onClose }) => {
//   if (!land) return null;

//   const containerStyle = { width: '100%', height: '100%' };
  
//   const formatDate = (dateStr: string | undefined) => {
//     return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
//   };

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
//           <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={{ lat: Number(land.latitude), lng: Number(land.longitude) }}
//               zoom={13}
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

//         <button className="bg-foreground hover:bg-primary text-white font-bold py-2 px-4 rounded mt-4">
//           Interested
//         </button>
//       </div>
//     </div>
//   );
// };

// const LandSearch: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [landDetails, setLandDetails] = useState<LandDetails | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/api/land-details?search=${searchTerm}`);
//       if (response.ok) {
//         const data = await response.json();
//         if (data) {
//           setLandDetails(data);
//           setIsModalOpen(true);
//         } else {
//           alert("No land details found for this search term.");
//         }
//       } else {
//         throw new Error('Failed to fetch land details');
//       }
//     } catch (error) {
//       console.error("Error fetching land details:", error);
//       alert("An error occurred while fetching land details. Please try again.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Land Search</h1>
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Enter search term..."
//           className="border border-gray-300 rounded px-2 py-1 flex-grow"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Search
//         </button>
//       </div>
      
//       {isModalOpen && landDetails && (
//         <LandDetailsModal
//           land={landDetails}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default LandSearch;












"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useLandData } from "../hooks/useLandData";
import LandDetailsModal from "../components/LandDetailModal";
import SearchErrorModal from "../components/SearchError";

const LandSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [parcelNumber, setParcelNumber] = useState<string>("");

  const { land, loading, error } = useLandData(parcelNumber);

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setParcelNumber(query.trim());
      setQuery("");
    }
  }, [query]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setShowErrorModal(false);
    setQuery("");
    setParcelNumber("");
  }, []);

  const handleRetry = useCallback(() => {
    setShowErrorModal(false);
    if (parcelNumber) {
      setQuery(parcelNumber);
      handleSearch();
    }
  }, [handleSearch, parcelNumber]);

  useEffect(() => {
    if (!loading && parcelNumber) {
      if (land) {
        setShowModal(true); // Ensure modal is shown when land data is fetched
        setShowErrorModal(false);
      } else if (error) {
        setShowErrorModal(true);
        setShowModal(false);
      }
    }
  }, [land, loading, error, parcelNumber]);

  return (
    <div className="container mx-auto p-4 ml-4 mr-6 md:ml-6 lg:ml-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-[#562B00]">
        Land Parcel Search
      </h1>
      <div className="flex flex-col sm:flex-row mb-4">
        <input
          type="text"
          placeholder="Enter Parcel Number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-grow p-2 border rounded-l mb-2 sm:mb-0 sm:rounded-l-none sm:rounded-l border-r-0"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="bg-[#508408] hover:bg-green-500 text-white font-bold m-auto py-2 px-4 rounded sm:rounded-l-none sm:rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {showModal && land && (
        <LandDetailsModal 
          land={land} 
          onClose={handleClose}
        />
      )}

      {showErrorModal && (
        <SearchErrorModal
          onClose={handleClose}
          onRetry={handleRetry}
          message={`The parcel number ${parcelNumber} does not match any land record. Please check the number and try again.`}
        />
      )}
    </div>
  );
};

export default LandSearch;

