import React from "react";

interface SearchErrorModalProps {
  onClose: () => void;
  message: string;
}

const SearchErrorModal: React.FC<SearchErrorModalProps> = ({ onClose, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-yellow-950"> Error</span> <br/>
          
          The parcel number was not found
        </h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
       
          <button
            onClick={onClose}
            className="bg-[#508408] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchErrorModal;
