"use client";

import React, { useEffect, useState } from "react";
import { AgreementFormData, UserRole } from "@/app/utils/types";
import ContractReviewPopup from "@/app/components/ContractReviewPopup";


const LawyerPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recentAgreement, setRecentAgreement] =
    useState<AgreementFormData | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchLawyerAgreements = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/agreements/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AgreementFormData[] = await response.json();
        const sortedAgreements = data.sort(
          (a, b) => b.agreement_id - a.agreement_id
        );
        setRecentAgreement(sortedAgreements[0] || null);
      } catch (error) {
        console.error("Error fetching lawyer agreements:", error);
        setError("Failed to fetch agreements. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyerAgreements();
  }, []);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAgreementUpdate = () => {
    console.log("Update the agreement");
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
      <h1 className="text-3xl font-bold mb-6 text-primary">Lawyer Dashboard</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold">Most Recent Agreement</h2>

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
              <strong>Parcel Number:</strong>{" "}
              {recentAgreement.parcel_number || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> Ksh{" "}
              {recentAgreement.agreed_amount?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong>Contract Duration:</strong>{" "}
              {recentAgreement.contract_duration} months
            </p>
            <p>
              <strong>Down Payment:</strong> Ksh{" "}
              {recentAgreement.down_payment?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong>Buyer Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded ${
                  recentAgreement.buyer_agreed
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {recentAgreement.buyer_agreed ? "Agreed" : "Pending"}
              </span>
            </p>
            <p>
              <strong>Seller Status:</strong>
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
              <strong>Last Updated:</strong>{" "}
              {new Date(recentAgreement.date_created).toLocaleString()}
            </p>

            <button
              onClick={handleShowPopup}
              className="mt-4 w-full px-4 py-2 bg-hover text-white rounded hover:bg-customGreen transition duration-300 ease-in-out"
            >
              Review Agreement
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 italic mb-4">No agreements found.</p>
          </div>
        )}
      </div>

      {showPopup && recentAgreement && (
        <ContractReviewPopup
          onClose={handleClosePopup}
          onAgreementUpdate={handleAgreementUpdate}
          agreement={recentAgreement}
          userRole={"lawyer" as UserRole}
          onSubmit={async () => {}}
        />
      )}
    </div>
  );
};

export default LawyerPage;
