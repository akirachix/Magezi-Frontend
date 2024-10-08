"use client";

import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
// import Sidebar from "../components/Sidebar";
import { FormData, Term } from "@/app/utils/types";
// import ContractReviewPopup from "../ContractReview/page";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ContractReviewPopup from "../(lawyer)/lawyer/components/ContractReview/page";
import SideBar from "../components/SideBarPwa";

const TermsAndConditions: React.FC = () => {
  const [agreement, setAgreement] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedTerms, setCheckedTerms] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [showLawyerView, setShowLawyerView] = useState(false);
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
      const data: FormData[] = await response.json();

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
            acc[term.id] = false;
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

      const result: FormData = await res.json();
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
      <SideBar userRole={""} />
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

        {agreement.terms &&
          agreement.terms.map((term) => (
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
                  checked={checkedTerms[term.id] || false}
                  onChange={() => handleTermCheck(term.id)}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
              </div>
            </div>
          ))}

        {(!userRole || userRole === "buyer") && (
          <button
            onClick={() => handleRoleSelection("buyer")}
            className="mt-4 w-full bg-hover text-white p-2 rounded hover:bg-green-200"
          >
            Agree to Terms as Buyer
          </button>
        )}

        {(!userRole || userRole === "seller") && (
          //   <button
          //     onClick={() => handleRoleSelection("seller")}
          //     className="mt-4 w-full bg-hover text-white p-

          <button
            onClick={() => handleRoleSelection("seller")}
            className="mt-4 w-full bg-hover text-white p-2 rounded hover:bg-green-200"
          >
            Agree to Terms as Seller
          </button>
        )}

        {(!userRole || userRole === "lawyer") && (
          <Link href="/Lawyer_agree">
            <button
              onClick={() => {
                handleRoleSelection("lawyer");
                setShowLawyerView((prev) => !prev);
              }}
              className="mt-4 w-full bg-hover text-white p-2 rounded hover:bg-green-200"
            >
              {showLawyerView ? "Hide Agreement Status" : "Check Who Agreed"}
            </button>
          </Link>
        )}

        {showLawyerView && userRole === "lawyer" && (
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
        )}

        {showPopup && agreement && (
          <ContractReviewPopup
            onClose={handleClosePopup}
            onSubmit={handleSubmit}
            agreement={agreement}
            userRole={userRole}
          />
        )}
      </div>
    </div>
  );
};

export default TermsAndConditions;
