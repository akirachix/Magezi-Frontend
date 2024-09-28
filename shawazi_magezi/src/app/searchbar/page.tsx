"use client";
import { useState, useCallback } from "react";
import { useLandData } from "../hooks/useLandData"; 
import LandDetailsModal from "../components/LandDetailModal"; 

const LandSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [parcelNumber, setParcelNumber] = useState<string>("");
  const { land, loading, error } = useLandData(parcelNumber); 

  const handleSearch = useCallback(() => {
    if (query) {
      setParcelNumber(query);
      setShowModal(true);
      setQuery("");
    }
  }, [query]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setQuery("");
    setParcelNumber("");
  }, []);

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
          className="flex-grow p-2 border rounded-l mb-2 sm:mb-0 sm:rounded-l-none sm:rounded-l border-r-0" 
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query}
          className="bg-[#508408] hover:bg-green-500 text-white font-bold m-auto py-2 px-4 rounded sm:rounded-l-none sm:rounded-r" 
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {showModal && land && (
        <LandDetailsModal land={land} onClose={handleClose} />
      )}
    </div>
  );
};

export default LandSearch;
