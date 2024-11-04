'use client'
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import * as yup from "yup";
import LawyerSidebar from "../components/lawyerSidebar";
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
  buyer_id: string;
  seller_id: string;
};
type ErrorType = {
  message: string;
};
const agreementSchema = yup.object().shape({
  buyer_id: yup.string().required("Buyer selection is required"),
  seller_id: yup.string().required("Seller selection is required"),
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
const CreateAgreement = () => {
  const router = useRouter();
  const { loading, error } = useNewAgreements();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [buyers, setBuyers] = useState<{ id: string; name: string }[]>([]);
  const [sellers, setSellers] = useState<{ id: string; name: string }[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgreementFormData>({
    resolver: yupResolver(agreementSchema),
  });
  useEffect(() => {
    setCookie("userRole", "lawyer", { maxAge: 3600 });
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const buyersList = data.filter((user: any) => user.role === 'buyer')
        .map((user: any) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
        }));
      const sellersList = data.filter((user: any) => user.role === 'seller')
        .map((user: any) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
        }));
      setBuyers(buyersList);
      setSellers(sellersList);
      console.log("Buyers: ", buyersList);
      console.log("Sellers: ", sellersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      setFetchError(error instanceof Error ? error.message : 'Failed to fetch users');
    }
  };
  const onSubmit = async (data: AgreementFormData) => {
    const transformedData = {
      ...data,
      date_created: data.date_created.toString().split("T")[0],
      buyer: data.buyer_id,   // Updated field name
      seller: data.seller_id,  // Updated field name
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
        const errorData = await response.json();
        throw new Error(
          Object.values(errorData).flat().join(", ") ||
          "Failed to create agreement"
        );
      }

      const newAgreement = await response.json();
      console.log("New Agreement: ", newAgreement);
      router.push(`/lawyer/components/agreementnext?agreement_id=${newAgreement.agreement_id}&buyer_id=${data.buyer_id}&seller_id=${data.seller_id}`);
    } catch (error) {
      console.error("Failed to submit agreement:", error);
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred.");
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
        <p className="text-red-500 mb-4">Error: {error instanceof Error ? error.message : "Unknown error"}</p>
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
    <div className="flex min-h-screen bg-gray-50">
      <LawyerSidebar />
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-brown-700">
              Create Agreement
            </h1>
            {(submitError || fetchError) && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {submitError || fetchError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-2 text-gray-700">Select Buyer</label>
                  <select
                    {...register('buyer_id')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800"
                  >
                    <option value="">Select a buyer</option>
                    {buyers.map(buyer => (
                      <option key={buyer.id} value={buyer.id}>{buyer.name}</option>
                    ))}
                  </select>
                  {errors.buyer_id && (
                    <p className="mt-1 text-sm text-red-500">{errors.buyer_id.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-2 text-gray-700">Select Seller</label>
                  <select
                    {...register('seller_id')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800"
                  >
                    <option value="">Select a seller</option>
                    {sellers.map(seller => (
                      <option key={seller.id} value={seller.id}>{seller.name}</option>
                    ))}
                  </select>
                  {errors.seller_id && (
                    <p className="mt-1 text-sm text-red-500">{errors.seller_id.message}</p>
                  )}
                </div>
                {formFields.map(({ label, name, type }) => (
                  <div key={name} className="flex flex-col">
                    <label className="text-sm font-semibold mb-2 text-gray-700">{label}</label>
                    <input
                      type={type}
                      {...register(name as keyof AgreementFormData)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800"
                      placeholder={label}
                    />
                    {errors[name as keyof AgreementFormData] && (
                      <p className="mt-1 text-sm text-red-500">{errors[name as keyof AgreementFormData]?.message}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-1 bg-[#508408] text-white font-bold py-3 px-6 rounded-lg hover:bg-primary transition duration-300 text-center ${
                    submitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? "Creating..." : "Create Agreement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAgreement;
function useNewAgreements() {
  return { loading: false, error: null as ErrorType | null };
}
