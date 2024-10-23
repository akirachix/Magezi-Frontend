"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/Ui";
import useAgreementsData from "@/app/hooks/useAgreementData";
import Sidebar from "../components/Sidebar";
import AgreementsProgressChart from "../components/Agreementschart";


interface RawAgreementData {
  agreement_id?: string;
  title?: string;
  last_updated?: string | Date;
  id?: string;
  contract_duration?: string | number;
  agreed_amount?: string | number;
  installment_schedule?: string | number;
  penalties_interest_rate?: string | number;
  total_amount_made?: string | number;
  date_created?: string | number | Date;
  date?: string | number | Date;
  month?: string;
  totalContracts?: number;
}


interface Agreement {
  agreement_id: string;
  title: string;
  last_updated: Date;
  id: string;
  contract_duration: number;
  agreed_amount: number;
  installment_schedule: number;
  penalties_interest_rate: number;
  total_amount_made: number;
}

function isValidAgreement(raw: RawAgreementData): raw is RawAgreementData & Required<Pick<RawAgreementData, 
  'agreement_id' | 'title' | 'last_updated' | 'id' | 'contract_duration' | 
  'agreed_amount' | 'installment_schedule' | 'penalties_interest_rate' | 'total_amount_made'
>> {
  return !!(
    raw.agreement_id &&
    raw.title !== undefined &&
    raw.last_updated &&
    raw.id &&
    raw.contract_duration !== undefined &&
    raw.agreed_amount !== undefined &&
    raw.installment_schedule !== undefined &&
    raw.penalties_interest_rate !== undefined &&
    raw.total_amount_made !== undefined
  );
}


function transformAgreement(raw: RawAgreementData & Required<Pick<RawAgreementData, 
  'agreement_id' | 'title' | 'last_updated' | 'id' | 'contract_duration' | 
  'agreed_amount' | 'installment_schedule' | 'penalties_interest_rate' | 'total_amount_made'
>>): Agreement {
  return {
    agreement_id: raw.agreement_id,
    title: String(raw.title),
    last_updated: new Date(raw.last_updated),
    id: raw.id,
    contract_duration: Number(raw.contract_duration),
    agreed_amount: Number(raw.agreed_amount),
    installment_schedule: Number(raw.installment_schedule),
    penalties_interest_rate: Number(raw.penalties_interest_rate),
    total_amount_made: Number(raw.total_amount_made)
  };
}


function matchesSearch(agreement: RawAgreementData, searchTerm: string): boolean {
  if (!searchTerm) return true;
  if (!agreement.agreement_id) return false;
  return agreement.agreement_id.toLowerCase().includes(searchTerm.toLowerCase());
}

const AgreementsTable: React.FC = () => {
  const { agreementsData, loading, error } = useAgreementsData();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!agreementsData) return <div>No data available</div>;


  const filteredAgreements: Agreement[] = (agreementsData as RawAgreementData[])
    .filter(agreement => matchesSearch(agreement, searchTerm))
    .filter(isValidAgreement)
    .map(transformAgreement);

  const totalItems: number = filteredAgreements.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentItems: Agreement[] = filteredAgreements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
      currencyDisplay: "narrowSymbol"
    }).format(amount);
  };

  const getStatus = (agreement: Agreement): string => {
    return agreement.agreed_amount > agreement.total_amount_made ? "Incomplete" : "Complete";
  };

  return (
    <div className="ml-80 mr-20">
      <h2 className="text-center mt-20 font-bold text-3xl text-[#562B00]">Agreements</h2>
      <AgreementsProgressChart />
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
            <h2 className="text-xl font-bold">Agreements List</h2>
            <div className="gap-4 text-base">
              <input
                type="text"
                placeholder="Search by Agreement ID..."
                className="px-3 py-2 border border-[#E4960E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E4960E]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Sidebar setActiveChart={() => {}} />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#562B00] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Agreement ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contract Duration (months)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Agreed Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Installment Schedule (months)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-500">
                {currentItems.map((agreement) => (
                  <tr key={agreement.agreement_id}>
                    <td className="px-6 py-4 whitespace-nowrap border-t border-green-500">
                      <div className="text-sm font-medium text-gray-900">{agreement.agreement_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-t border-green-500 text-sm text-gray-500">{agreement.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-t border-green-500 text-sm text-gray-500">{agreement.contract_duration} months</td>
                    <td className="px-6 py-4 whitespace-nowrap border-t border-green-500 text-sm text-gray-500">{formatCurrency(agreement.agreed_amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-t border-green-500 text-sm text-gray-500">{agreement.installment_schedule} months</td>
                    <td className="px-6 py-4 whitespace-nowrap border-t border-green-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        getStatus(agreement) === "Incomplete"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        {getStatus(agreement)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <button
                className={`px-4 py-2 border rounded-md ${currentPage === 1 ? "bg-[#562B00]" : "bg-[#508408]"} text-white`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? "bg-[#562B00]" : "bg-[#508408]"} text-white`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgreementsTable;