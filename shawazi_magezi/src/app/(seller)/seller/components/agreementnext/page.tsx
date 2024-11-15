
"use client";

import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { AgreementFormData, Term, UserRole } from "@/app/utils/types";
import { useRouter } from "next/navigation";
// import BuyerSidebar from "../BuyerSidebar";
import ContractReviewPopup from "@/app/components/Contractreviewpop";
import SellerSidebar from "../SellerSidebar";
// import SideBar from "../components/Sidebarpwa";
// import ContractReviewPopup from "../components/Contractreviewpop";

const TermsAndConditions: React.FC = () => {
  const [agreement, setAgreement] = useState<AgreementFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedTerms, setCheckedTerms] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.EMPTY);
  const router = useRouter();

  useEffect(() => {
    const existingRole = getCookie("userRole");
    if (existingRole && ["buyer", "seller", "lawyer"]) {
      setUserRole(existingRole as UserRole);
    }

    const storedAgreement = localStorage.getItem("recentAgreement");
    if (storedAgreement) {
      setAgreement(JSON.parse(storedAgreement));
      setLoading(false);
    } else {
      fetchAgreements();
    }
  }, []);

  const fetchAgreements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/agreements");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch agreements: ${response.status} ${response.statusText}`
        );
      }
      const data: AgreementFormData[] = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No agreements found");
      }

      const mostRecentAgreement = data.sort(
        (a, b) =>
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
      )[0];
      setAgreement(mostRecentAgreement);

      localStorage.setItem(
        "recentAgreement",
        JSON.stringify(mostRecentAgreement)
      );

      const initialCheckedTerms =
        mostRecentAgreement.terms?.reduce(
          (acc: Record<string, boolean>, term: Term) => {
            if (term.id) {
              acc[term.id] = false;
            }
            return acc;
          },
          {}
        ) || {};

      setCheckedTerms(initialCheckedTerms);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTermCheck = (termId: string) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRoleSelection = (role: UserRole) => {
    setCookie("userRole", role, { maxAge: 3600 });
    setUserRole(role);
    if (role === UserRole.BUYER || role === UserRole.SELLER) {
      setShowPopup(true);
    }
  };

  const handleSubmit = async (response: {
    buyer_agreed?: boolean;
    seller_agreed?: boolean;
  }) => {
    if (!agreement) return;

    try {
      const updatedAgreement = { ...agreement, ...response };
      const res = await fetch(`/api/agreements/${agreement.agreement_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAgreement),
      });

      if (!res.ok) {
        throw new Error("Failed to update agreement");
      }

      const result: AgreementFormData = await res.json();
      setAgreement(result);
      setShowPopup(false);

      if (userRole === UserRole.BUYER && result.buyer_agreed) {
        router.push("/buyer/buyer_agree");
      } else if (userRole === UserRole.SELLER && result.seller_agreed) {
        router.push("/seller/seller_agree");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
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
          onClick={fetchAgreements}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry Loading Agreement
        </button>
      </div>
    );
  }

  if (!agreement)
    return <div className="text-center py-4">No agreement found.</div>;

  return (
    <div className="flex">
      {/* <SideBar userRole={userRole} /> */}
      <SellerSidebar/>
      <div className="p-4 max-w-3xl mx-auto flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Terms And Conditions
        </h1>
        <div className="mb-6 p-6 border rounded gap-x-10">
  <h2 className="text-lg font-semibold">Agreement Details</h2>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Parcel Number:</strong> {agreement.parcel_number}
    </p>
  </div>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Date Created:</strong> {new Date(agreement.date_created).toLocaleDateString()}
    </p>
  </div>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Contract Duration:</strong> {agreement.contract_duration} months
    </p>
  </div>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Agreed Amount:</strong> Ksh {agreement.agreed_amount}
    </p>
  </div>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Installment Schedule:</strong> {agreement.installment_schedule} months
    </p>
  </div>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Penalties Interest Rate:</strong> {agreement.penalties_interest_rate}%
    </p>
  </div>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Down Payment:</strong> Ksh {agreement.down_payment}
    </p>
  </div>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Remaining Amount:</strong> Ksh {agreement.remaining_amount}
    </p>
  </div>
  <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
    <p className="flex-1 text-white">
      <strong>Total Amount Made:</strong> Ksh {agreement.total_amount_made}
    </p>
  </div>
</div>
        {agreement.terms &&
          agreement.terms.map((term: Term) => (
            <div
              key={term.id}
              className="mb-4 p-4 border rounded shadow bg-green-50 flex justify-between items-center"
            >
              <div className="flex-1">
                <span>{term.text}</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    term.id ? checkedTerms[String(term.id)] || false : false
                  }
                  onChange={() => {
                    if (term.id !== undefined) {
                      handleTermCheck(String(term.id));
                    }
                  }}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
              </div>
            </div>
          ))}

        {/* {(!getCookie("userRole") || getCookie("userRole") === "buyer") && (
          <button
            onClick={() => handleRoleSelection(UserRole.BUYER)}
            className="mt-4 w-full bg-hover text-white p-2 rounded hover:bg-green-200"
          >
            Agree to Terms as Buyer
          </button>
        )} */}

        {(!getCookie("userRole") || getCookie("userRole") === "seller") && (
          <button
            onClick={() => handleRoleSelection(UserRole.SELLER)}
            className="mt-4 w-full bg-hover text-white p-2 rounded hover:bg-green-200"
          >
            Agree to Terms as Seller
          </button>
        )}

        {/* {(!getCookie("userRole") || getCookie("userRole") === "lawyer") && (
          <Link href="/lawyer/lawyer_agree">
            <button
              onClick={() => {
                handleRoleSelection(UserRole.LAWYER);
                setShowLawyerView((prev) => !prev);
              }}
              className="mt-4 w-full bg-hover text-white p-2 rounded hover:bg-green-200"
            >
              {showLawyerView ? "Hide Agreement Status" : "Check Who Agreed"}
            </button>
          </Link>
        )}

        {showLawyerView && userRole === UserRole.LAWYER && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="font-semibold">Agreement Status:</h3>
            <p>
              <strong>Buyer:</strong>{" "}
              {agreement.buyer_agreed ? "Agreed" : "Not Agreed"}
            </p>
            <p>
              <strong>Seller:</strong>{" "}
              {agreement.seller_agreed ? "Agreed" : "Not Agreed"}
            </p>
          </div>
        )} */}

        {showPopup && agreement && (
          <ContractReviewPopup
            onClose={handleClosePopup}
            onSubmit={handleSubmit}
            agreement={agreement}
            userRole={userRole}
            onAgreementUpdate={() => fetchAgreements()}
          />
        )}
      </div>
    </div>
  );
};

export default TermsAndConditions;









// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { getCookie } from 'cookies-next';
// import { AgreementFormData, UserRole } from '@/app/utils/types';
// import SellerSidebar from '../components/SellerSidebar';
// // import SellerSidebar from '../SellerSidebar';
// // import SellerSidebar from './components/SellerSidebar';
// // import SellerSidebar from '../components/SellerSidebar';

// const SellerAgreementNext: React.FC = () => {
//   const [agreement, setAgreement] = useState<AgreementFormData | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const userRole = getCookie('userRole');
//     if (userRole !== UserRole.SELLER) {
//       router.push('/seller/agreementnext');
//       return;
//     }

//     const fetchAgreement = async () => {
//       // Fetch the most recent agreement for the seller
//       // You'll need to implement this API endpoint
//       const response = await fetch('/api/seller/recent-agreement');
//       if (response.ok) {
//         const data = await response.json();
//         setAgreement(data);
//       }
//     };

//     fetchAgreement();
//   }, [router]);

//   if (!agreement) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex">
//       <SellerSidebar />
//       <div className="flex-grow p-6">
//         <h1 className="text-2xl font-bold mb-4">Seller Agreement Details</h1>
//         {/* Display agreement details here */}
//         <p>Parcel Number: {agreement.parcel_number}</p>
//         <p>Agreed Amount: {agreement.agreed_amount}</p>
//         {/* Add more agreement details as needed */}
//       </div>
//     </div>
//   );
// };

// export default SellerAgreementNext;