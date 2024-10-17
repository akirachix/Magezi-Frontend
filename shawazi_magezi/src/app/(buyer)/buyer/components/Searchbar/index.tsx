"use client";

import React, { useState, useCallback, useEffect } from "react";
import useLandData from "@/app/hooks/useLandData";
import LandDetailsModal from "../LandDetailModal";
import SearchErrorModal from "../SearchError";
import { Loader2 } from "lucide-react";

const LandSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [parcelNumber, setParcelNumber] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<Set<string>>(new Set());

  // Reset the land data hook when closing modals
  const { land, loading, error } = useLandData(parcelNumber);

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setSearchHistory((prev) => new Set(prev).add(query.trim()));
      setParcelNumber(query.trim());
      setQuery("");
    }
  }, [query]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setShowErrorModal(false);
    setParcelNumber("");
  }, []);

  const handleNewSearch = useCallback(() => {
    handleClose();

    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }, [handleClose]);

  useEffect(() => {
    if (!loading && parcelNumber) {
      if (land) {
        setShowModal(true);
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
          className="flex-grow p-2 border rounded-lg sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-[#508408] focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="bg-[#508408] hover:bg-green-600 text-white font-bold py-1 px-4 rounded-lg sm:rounded-l-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {searchHistory.size > 0 && (
        <div className="mt-4">
          <h2 className="text-sm text-gray-600 mb-2">Recent searches:</h2>
          <div className="flex flex-wrap gap-2">
            {Array.from(searchHistory).map((search) => (
              <button
                key={search}
                onClick={() => {
                  setQuery(search);
                  handleSearch();
                }}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {showModal && land && (
        <LandDetailsModal
          land={land}
          onClose={() => {
            handleClose();
            setTimeout(() => {
              handleNewSearch();
            }, 100);
          }}
        />
      )}

      {showErrorModal && (
        <SearchErrorModal
          onClose={() => {
            handleClose();
            setTimeout(() => {
              handleNewSearch();
            }, 100);
          }}
          message={`The parcel number ${parcelNumber} does not match any land record. Please check the number and try again.`}
        />
      )}
    </div>
  );
};

export default LandSearch;
