"use client";

import React, { useEffect, useState, useCallback } from "react";
import ContractReviewPopup from "@/app/(lawyer)/lawyer/components/ContractReview/page";
import { AgreementType } from "@/app/utils/types";

const SellerPage: React.FC = () => {
  const [agreements, setAgreements] = useState<AgreementType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const fetchSellerAgreements = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/agreements/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AgreementType[] = await response.json();

      const largestIdAgreement = data.reduce((prev, current) =>
        prev.agreement_id > current.agreement_id ? prev : current
      );

      setAgreements([largestIdAgreement]);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error fetching seller agreements:", error);
      setError("Failed to fetch agreements. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSellerAgreements();
    const intervalId = setInterval(fetchSellerAgreements, 30000);
    return () => clearInterval(intervalId);
  }, [fetchSellerAgreements]);

  const recentAgreement = agreements.length > 0 ? agreements[0] : null;

  const handleRefresh = () => {
    fetchSellerAgreements();
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const getLatestTerm = (agreement: AgreementType | null) => {
    if (
      !agreement?.terms ||
      !Array.isArray(agreement.terms) ||
      agreement.terms.length === 0
    ) {
      return { text: "No terms available" };
    }
    return agreement.terms[agreement.terms.length - 1];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-primary">Seller Dashboard</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Most Recent Listing</h2>
          <button
            onClick={handleRefresh}
            className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-indigo-600 transition duration-300"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {recentAgreement ? (
          <div className="space-y-3">
            <p>
              <strong className="text-gray-700">Percel Number:</strong>{" "}
              {recentAgreement.parcel_number || "N/A"}
            </p>
            <p>
              <strong className="text-gray-700">Listed Price:</strong> Ksh
              {recentAgreement.agreed_amount?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong className="text-gray-700">Contract Duration:</strong>{" "}
              {recentAgreement.contract_duration} months
            </p>
            <p>
              <strong className="text-gray-700">Down Payment:</strong> Ksh
              {recentAgreement.down_payment?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong className="text-gray-700">Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded ${
                  recentAgreement.seller_agreed
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {recentAgreement.seller_agreed ? "Agreed" : "Pending"}
              </span>
            </p>
            <p>
              <strong className="text-gray-700">Last Updated:</strong>{" "}
              {new Date(recentAgreement.date_created).toLocaleString()}
            </p>

            {/* <details className="mt-4">
              <summary className="cursor-pointer text-indigo-600 hover:text-indigo-800">View Full Listing Details</summary>
              <div className="mt-2 p-3 bg-gray-200 rounded text-xs overflow-auto">
                <pre>{JSON.stringify(recentAgreement, null, 2)}</pre>
              </div>
            </details> */}

            <button
              onClick={handleShowPopup}
              className="mt-4 w-full px-4 py-2 bg-primary text-white rounded hover:bg-customGreen transition duration-300 ease-in-out"
              disabled={recentAgreement.seller_agreed} // Disable if already agreed
            >
              {recentAgreement.seller_agreed
                ? "Agreement Already Reviewed"
                : "Review and Agree"}
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 italic mb-4">No listings found.</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-indigo-600 transition duration-300"
            >
              Check for New Listings
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-600 text-right">
        Last refreshed: {lastRefresh.toLocaleString()}
      </p>

      {showPopup && recentAgreement && (
        <ContractReviewPopup
          onClose={handleClosePopup}
          onAgreementUpdate={fetchSellerAgreements}
          agreement={recentAgreement}
          userRole="seller"
          latestTerm={getLatestTerm(recentAgreement)}
        />
      )}
    </div>
  );
};

export default SellerPage;
