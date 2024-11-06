"use client";

import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { AgreementFormData, Term, UserRole } from "@/app/utils/types";
import { useSearchParams } from "next/navigation";
import ContractReviewPopup from "@/app/components/Contractreviewpop";
import SellerSidebar from "../Sellersidebar";
import { fetchLandDetails } from "@/app/utils/getLandDetails";
import { fetchUsers } from "@/app/utils/fetchUsers";
import { fetchAgreements } from "@/app/utils/fetchAgreements";

const TermsAndConditions: React.FC = () => {
  const [agreement, setAgreement] = useState<AgreementFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedTerms, setCheckedTerms] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.EMPTY);
  const [buyers, setBuyers] = useState<Record<string, string>>({});
  const [sellers, setSellers] = useState<Record<string, string>>({});
  
  const searchParams = useSearchParams();
  const parcelNumber = searchParams.get('parcel_number') || 'DEFAULT_VALUE';

  useEffect(() => {
    const existingRole = getCookie("userRole");
    if (existingRole && ["buyer", "seller", "lawyer"].includes(existingRole)) {
      setUserRole(existingRole as UserRole);
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { agreement: fetchedAgreement, checkedTerms: fetchedCheckedTerms } = await fetchAgreements(parcelNumber);
        setAgreement(fetchedAgreement);
        setCheckedTerms(fetchedCheckedTerms);
        
        const users = await fetchUsers();
        setBuyers(users.buyers);
        setSellers(users.sellers);
        
        await fetchLandDetails(parcelNumber); 
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parcelNumber]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (): Promise<void> => {
    throw new Error("Function not implemented.");
  };

  const handleRoleSelection = (role: UserRole) => {
    setCookie("userRole", role, { maxAge: 3600 });
    setUserRole(role);
    if (role === UserRole.BUYER || role === UserRole.SELLER) {
      setShowPopup(true);
    }
  };

  const handleTermCheck = (termId: string) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => fetchAgreements(parcelNumber)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry Loading Agreement
        </button>
      </div>
    );
  }

  if (!agreement) return <div className="text-center py-4">No agreement found.</div>;

  const buyerDisplayName = agreement.buyer ? buyers[agreement.buyer] : "Unknown Buyer";
  const sellerDisplayName = agreement.seller ? sellers[agreement.seller] : "Unknown Seller";

  return (
    <div className="flex">
      <SellerSidebar />
      <div className="p-4 max-w-3xl mx-auto flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center">Terms And Conditions</h1>
        <div className="mb-6 p-6 border rounded gap-x-10">
          <h2 className="text-lg font-semibold">Agreement Details</h2>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Buyer Name:</strong> {buyerDisplayName}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Seller Name:</strong> {sellerDisplayName}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Parcel Number:</strong> {agreement.parcel_number || parcelNumber}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Date Created:</strong> {new Date(agreement.date_created).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Contract Duration:</strong> {agreement.contract_duration} months</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Agreed Amount:</strong> Ksh {agreement.agreed_amount}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Installment Schedule:</strong> {agreement.installment_schedule} months</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Penalties Interest Rate:</strong> {agreement.penalties_interest_rate}%</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Down Payment:</strong> Ksh {agreement.down_payment}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Remaining Amount:</strong> Ksh {agreement.remaining_amount}</p>
          </div>
          <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
            <p className="flex-1 text-white"><strong>Total Amount Made:</strong> Ksh {agreement.total_amount_made || 0}</p>
          </div>
        </div>

        {agreement.terms?.map((term: Term) => (
          <div key={term.id} className="mb-4 p-4 border rounded shadow bg-green-50 flex justify-between items-center">
            <div className="flex-1"><span>{term.text}</span></div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={term.id ? checkedTerms[String(term.id)] || false : false}
                onChange={() => handleTermCheck(String(term.id))}
                className="form-checkbox h-5 w-5 text-green-600"
              />
            </div>
          </div>
        ))}

        {(!getCookie("userRole") || getCookie("userRole") === "seller") && (
          <button
            onClick={() => handleRoleSelection(UserRole.SELLER)}
            className="mt-4 w-full bg-foreground text-white p-2 rounded border-2 border-transparent hover:bg-white hover:text-foreground hover:border-foreground"
          >
            Agree to Terms as Seller
          </button>
        )}

        {showPopup && agreement && (
          <ContractReviewPopup
            onClose={handleClosePopup}
            onSubmit={handleSubmit} 
            agreement={agreement}
            userRole={userRole}
            onAgreementUpdate={() => fetchAgreements(parcelNumber)} 
          />
        )}
      </div>
    </div>
  );
};

export default TermsAndConditions;