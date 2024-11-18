'use client';

import React, { useEffect, useState, useCallback } from "react";
import DocumentViewer from "@/app/(lawyer)/lawyer/components/Documentviewer";
import { AgreementType, UserRole, AgreementFormData, Term, ParcelLocation } from "@/app/utils/types";
import ContractReviewPopup from "@/app/components/Contractreviewpop";

interface ResponseType {
  buyer_agreed?: boolean;
  seller_agreed?: boolean;
}

const SellerPage: React.FC = () => {
  const [agreements, setAgreements] = useState<AgreementType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'documents' | 'transactions'>('details');

  const fetchSellerAgreements = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/agreements/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AgreementType[] = await response.json();
      if (data.length > 0) {
        const largestIdAgreement = data.reduce((prev, current) =>
          (prev.agreement_id > current.agreement_id) ? prev : current
        );
        setAgreements([largestIdAgreement]);
      } else {
        setAgreements([]);
      }
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

  const handleSubmit = async (response: ResponseType): Promise<void> => {
    try {
      console.log(response);
      await fetchSellerAgreements();
    } catch (error) {
      console.error("Error submitting response:", error);
      setError("Failed to submit response. Please try again.");
    }
  };

  const getLatestTerm = (agreement: AgreementType | null): Term => {
    if (!agreement?.terms || !Array.isArray(agreement.terms) || agreement.terms.length === 0) {
      return { text: 'No terms available', description: '', value: '' };
    }
    return {
      text: agreement.terms[agreement.terms.length - 1],
      description: '',
      value: ''
    };
  };

  const transformToFormData = (agreement: AgreementType): AgreementFormData => {
    return {
      id: agreement.agreement_id,
      agreement_id: agreement.agreement_id,
      contract_duration: agreement.contract_duration || 0,
      transaction_count: 0,
      agreement: '',
      terms: Array.isArray(agreement.terms)
        ? agreement.terms.map(term => ({
            text: term,
            description: '',
            value: ''
          }))
        : [],
      parcel_number: agreement.parcel_number ? formatParcelNumber(agreement.parcel_number) : 'N/A',
      agreed_amount: agreement.agreed_amount || 0,
      down_payment: agreement.down_payment || 0,
      seller_agreed: agreement.seller_agreed || null,
      buyer_agreed: agreement.buyer_agreed || null,
      date_created: agreement.date_created,
      lawyer: agreement.lawyer || '',
      seller: `${agreement.seller?.first_name || ''} ${agreement.seller?.last_name || ''}`,
      buyer: `${agreement.buyer?.first_name || ''} ${agreement.buyer?.last_name || ''}`,
      terms_and_conditions: agreement.terms_and_conditions || '',
      remaining_amount: agreement.remaining_amount || 0,
      total_amount_made: agreement.total_amount_made || 0,
      installment_schedule: agreement.installment_schedule || 0, // Added this line
      penalties_interest_rate: agreement.penalties_interest_rate || 0, // Added this line
      agreement_hash: agreement.agreement_hash || '',
      previous_hash: agreement.previous_hash || '',
      transactions_history: JSON.stringify(agreement.transactions_history || [])
    };
  };

  const formatParcelNumber = (parcelNumber: string | ParcelLocation): string => {
    if (typeof parcelNumber === 'string') {
      return parcelNumber;
    }
    return `${parcelNumber.latitude}, ${parcelNumber.longitude}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Seller Dashboard</h1>

      <div className="mb-6 border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Agreement Details
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'transactions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Transaction History
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        {activeTab === 'details' && (
          <div className="p-6">
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
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {recentAgreement ? (
              <div className="space-y-4">
                <p><strong className="text-gray-700">Parcel Number:</strong> {recentAgreement.parcel_number ? formatParcelNumber(recentAgreement.parcel_number) : 'N/A'}</p>
                <p><strong className="text-gray-700">Listed Price:</strong> Ksh{recentAgreement.agreed_amount?.toLocaleString() || 'N/A'}</p>
                <p><strong className="text-gray-700">Contract Duration:</strong> {recentAgreement.contract_duration} months</p>
                <p><strong className="text-gray-700">Down Payment:</strong> Ksh{recentAgreement.down_payment?.toLocaleString() || 'N/A'}</p>
                <p>
                  <strong className="text-gray-700">Status:</strong>
                  <span className={`ml-2 px-2 py-1 rounded ${recentAgreement.seller_agreed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {recentAgreement.seller_agreed ? 'Agreed' : 'Pending'}
                  </span>
                </p>
                <p><strong className="text-gray-700">Last Updated:</strong> {new Date(recentAgreement.date_created).toLocaleString()}</p>

                <button
                  onClick={handleShowPopup}
                  className="mt-4 w-full px-4 py-2 bg-primary text-white rounded hover:bg-customGreen transition duration-300 ease-in-out"
                  disabled={recentAgreement.seller_agreed}
                >
                  {recentAgreement.seller_agreed ? 'Agreement Already Reviewed' : 'Review and Agree'}
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
        )}

        {activeTab === 'documents' && (
          <DocumentViewer />
        )}
      </div>

      <p className="mt-4 text-sm text-gray-600 text-right">
        Last refreshed: {lastRefresh.toLocaleString()}
      </p>

      {showPopup && recentAgreement && (
        <ContractReviewPopup
          onClose={handleClosePopup}
          onAgreementUpdate={fetchSellerAgreements}
          agreement={transformToFormData(recentAgreement)}
          userRole={UserRole.SELLER}
          latestTerm={getLatestTerm(recentAgreement)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default SellerPage;