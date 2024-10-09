"use client";

import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { AgreementFormData, Term } from "@/app/utils/types";
// import ContractReviewPopup from "../components/ContractReviewPopup";
import { useRouter } from "next/navigation";
import ContractReviewPopup from "../components/ContractReviewPopup";

const TermsAndConditions: React.FC = () => {
  const [agreement, setAgreement] = useState<AgreementFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedTerms, setCheckedTerms] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const existingRole = getCookie("userRole");
    if (existingRole) {
      setUserRole(existingRole as string);
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
              acc[String(term.id)] = false;
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

  const handleTermCheck = (termId: string | number) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [String(termId)]: !prev[String(termId)],
    }));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAgreementUpdate = () => {
    console.log("Agreement updated!");
  };

  const handleRoleSelection = (role: string) => {
    setCookie("userRole", role, { maxAge: 3600 });
    setUserRole(role);
    if (role === "buyer" || role === "seller") {
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

      if (userRole === "buyer" && result.buyer_agreed) {
        router.push("/Buyer_agree");
      } else if (userRole === "seller" && result.seller_agreed) {
        router.push("/Seller_agree");
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
      <div className="p-4 max-w-3xl mx-auto flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Terms And Conditions
        </h1>
        <div className="mb-6 p-6 border rounded gap-x-10">
          <h2 className="text-lg font-semibold">Agreement Details</h2>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Parcel Number:</strong> {agreement.parcel_number}
            </p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Date Created:</strong>{" "}
              {new Date(agreement.date_created).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Contract Duration:</strong> {agreement.contract_duration}{" "}
              months
            </p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Agreed Amount:</strong> Ksh {agreement.agreed_amount}
            </p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Installment Schedule:</strong>{" "}
              {agreement.installment_schedule} months
            </p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Penalties Interest Rate:</strong>{" "}
              {agreement.penalties_interest_rate}%
            </p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Down Payment:</strong> Ksh {agreement.down_payment}
            </p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Remaining Amount:</strong> Ksh{" "}
              {agreement.remaining_amount}
            </p>
          </div>
          <div className="flex justify-between items-center my-4 bg-customGreen shadow p-4 rounded">
            <p className="flex-1">
              <strong>Total Amount Made:</strong> Ksh{" "}
              {agreement.total_amount_made}
            </p>
          </div>
        </div>

        <div className="mb-4">
        <h3 className="text-lg font-semibold">Terms</h3>
<ul className="list-disc pl-5">
  {agreement.terms && Array.isArray(agreement.terms) ? (
    agreement.terms.map((term: Term) => (
      <li key={term.id}>
        <input
          type="checkbox"
          checked={checkedTerms[String(term.id)]}
          onChange={() => handleTermCheck(term.id!)}
        />
        {term.text}
      </li>
    ))
  ) : (
    <li>No terms available.</li>
  )}
</ul>

        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleRoleSelection(userRole)}
          >
            Agree
          </button>
        </div>

        {showPopup && agreement && (
          <ContractReviewPopup
            agreement={agreement}
            onClose={handleClosePopup}
            onSubmit={handleSubmit}
            userRole={userRole as "buyer" | "seller" | "lawyer"}
            onAgreementUpdate={handleAgreementUpdate}
          />
        )}
        <button onClick={() => setShowPopup(true)}>Review Contract</button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
