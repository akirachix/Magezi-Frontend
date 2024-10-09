"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";

// Define the AgreementFormData type
type AgreementFormData = {
  parcel_number: string;
  date_created: string;
  contract_duration: number;
  agreed_amount: number;
  installment_schedule: number;
  penalties_interest_rate: number;
  down_payment: number;
  remaining_amount: number;
  total_amount_made: number;
};

// Validation schema
const agreementSchema = yup.object().shape({
  parcel_number: yup.string().required("Parcel number is required"),
  date_created: yup
    .string()
    .required("Date created is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD"),
  contract_duration: yup
    .number()
    .required("Contract duration is required")
    .positive("Must be a positive number"),
  agreed_amount: yup
    .number()
    .required("Agreed amount is required")
    .positive("Must be a positive number"),
  installment_schedule: yup
    .number()
    .required("Installment schedule is required")
    .positive("Must be a positive number"),
  penalties_interest_rate: yup
    .number()
    .required("Penalties interest rate is required")
    .positive("Must be a positive number"),
  down_payment: yup
    .number()
    .required("Down payment is required")
    .positive("Must be a positive number"),
  remaining_amount: yup
    .number()
    .required("Remaining amount is required")
    .positive("Must be a positive number"),
  total_amount_made: yup
    .number()
    .required("Total amount made is required")
    .positive("Must be a positive number"),
});

const CreateAgreement: React.FC = () => {
  const router = useRouter();
  const { loading, error } = useNewAgreements();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgreementFormData>({
    resolver: yupResolver(agreementSchema),
  });

  const onSubmit = async (data: AgreementFormData) => {
    const transformedData = {
      ...data,
      date_created: data.date_created.toString().split("T")[0],
    };
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/agreements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Failed to parse error response",
        }));
        console.error("Failed to create agreement:", errorData);
        const errorMessages =
          Object.values(errorData).flat().join(", ") ||
          "Failed to create agreement";
        throw new Error(errorMessages);
      }
      const newAgreement = await response.json();
      localStorage.setItem("recentAgreement", JSON.stringify(newAgreement));
      router.push("/agreementNext");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to submit agreement:", error.message);
        setSubmitError(
          error.message ||
          "An unexpected error occurred. Please try again later."
        );
      } else {
        console.error("An unknown error occurred:", error);
        setSubmitError("An unknown error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
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
        <p className="text-red-500 mb-4">Error: {error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const formFields = [
    { label: "Parcel Number", name: "parcel_number", type: "text" },
    { label: "Date Created", name: "date_created", type: "date" },
    { label: "Contract Duration (in months)", name: "contract_duration", type: "number" },
    { label: "Agreed Amount", name: "agreed_amount", type: "number" },
    { label: "Installment Schedule (in months)", name: "installment_schedule", type: "number" },
    { label: "Penalties Interest Rate (%)", name: "penalties_interest_rate", type: "number" },
    { label: "Down Payment", name: "down_payment", type: "number" },
    { label: "Remaining Amount", name: "remaining_amount", type: "number" },
    { label: "Total Amount Made", name: "total_amount_made", type: "number" },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6 text-brown-700">
        Create Agreement
      </h1>
      {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map(({ label, name, type }, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              {...register(name as keyof AgreementFormData)}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
            {errors[name as keyof AgreementFormData] && (
              <p className="text-red-500">
                {errors[name as keyof AgreementFormData]?.message}
              </p>
            )}
          </div>
        ))}
        <div className="flex space-x-2 mt-6">
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 bg-[#508408] text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-300 ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Creating..." : "Create Agreement"}
          </button>
          <button
            type="button"
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-opacity-90 transition duration-300"
            onClick={() => router.push("/agreementNext")}
          >
            Next Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAgreement;

function useNewAgreements(): { loading: boolean; error: { message: string } | null } {
  return { loading: false, error: null }; 
}

