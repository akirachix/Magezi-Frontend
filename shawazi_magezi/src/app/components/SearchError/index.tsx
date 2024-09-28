import React from "react";

interface SearchErrorModalProps {
  onClose: () => void;
  onRetry: () => void;
  message: string;
}

const SearchErrorModal: React.FC<SearchErrorModalProps> = ({ onClose, onRetry, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onRetry}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Retry
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchErrorModal;
