"use client";
import React, { useState, useEffect } from 'react';
import { FileText as DocumentIcon, Download as DownloadIcon, EyeIcon } from 'lucide-react';
import { AgreementType } from "@/app/utils/types";
import { jsPDF } from 'jspdf';
const DocumentViewer = () => {
  const [agreements, setAgreements] = useState<AgreementType[]>([]);
  const [selectedAgreement, setSelectedAgreement] = useState<AgreementType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [latestId, setLatestId] = useState<number | null>(null);
  useEffect(() => {
    fetchAgreements();
  }, []);
  const fetchAgreements = async () => {
    try {
      const response = await fetch('/api/agreements/');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Failed to fetch agreements: ' + errorText);
      }
      const data: AgreementType[] = await response.json();
      const sortedAgreements = data
        .filter(agreement => agreement.agreement_id !== null)
        .sort((a, b) => (b.agreement_id || 0) - (a.agreement_id || 0)); // Ensure ID is treated as a number
      setAgreements(sortedAgreements);
      if (sortedAgreements.length > 0) {
        setLatestId(sortedAgreements[0].agreement_id || null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load agreements');
    } finally {
      setLoading(false);
    }
  };
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(0);
            fetchAgreements();
          }, 1000);
        } else {
          progress += 10;
          setUploadProgress(progress);
        }
      }, 200);
    }
  };
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "Ksh 0.00";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KSH'
    }).format(amount);
  };
  const generatePDF = async (agreement: AgreementType) => {
    if (!agreement) return;
    const doc = new jsPDF();
    const lineHeight = 10;
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const addText = (text: string, fontSize: number = 12, align: string = 'left') => {
      doc.setFontSize(fontSize);
      if (align === 'center') {
        const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
        doc.text(text, (pageWidth - textWidth) / 2, yPosition);
      } else {
        doc.text(text, 20, yPosition);
      }
      yPosition += lineHeight;
    };
    const addSection = (title: string) => {
      checkPageSpace(30);
      yPosition += 5;
      doc.setFont("helvetica", "bold");
      addText(title, 14);
      doc.setFont("helvetica", "normal");
      yPosition += 2;
    };
    const checkPageSpace = (requiredSpace: number) => {
      if (yPosition + requiredSpace > 280) {
        doc.addPage();
        yPosition = 20;
      }
    };
    doc.setFont("helvetica", "bold");
    addText("LAND SALE AGREEMENT", 18, 'center');
    addText("(INSTALLMENT PURCHASE)", 16, 'center');
    yPosition += 10;
    doc.setFont("helvetica", "italic");
    addText("This agreement is made in accordance with the Land Act 2012, the Land Registration Act 2012,");
    addText("and the Law of Contract Act of Kenya (Cap 23).");
    yPosition += 5;
    doc.setFont("helvetica", "normal");
    addText(`THIS CONTRACT made on ${new Date(agreement.date_created).toLocaleDateString()}`);
    addText(`BETWEEN:`);
    addText(`${agreement.seller?.first_name || '[Seller First Name]'} ${agreement.seller?.last_name || '[Seller Last Name]'} (hereinafter called 'the Seller')`);
    addText(`AND`);
    addText(`${agreement.buyer?.first_name || '[Buyer First Name]'} ${agreement.buyer?.last_name || '[Buyer Last Name]'} (hereinafter called 'the Buyer')`);
    addSection("1. PROPERTY DESCRIPTION");
    addText("1.1 The Seller agrees to sell and the Buyer agrees to purchase:");
    addText(`Location: Latitude ${agreement.parcel_number?.latitude || '[Latitude]'}`);
    addText(`          Longitude ${agreement.parcel_number?.longitude || '[Longitude]'}`);
    addText("1.2 Land Reference Number: [Insert LR Number]");
    addText("1.3 Approximate Area: [Insert Area] hectares/acres");
    addText("1.4 The property includes all improvements, fixtures, and natural resources thereon.");
    addSection("2. PURCHASE PRICE AND PAYMENT TERMS");
    addText(`2.1 Total Purchase Price: ${formatCurrency(agreement.agreed_amount)}`);
    addText(`2.2 Down Payment: ${formatCurrency(agreement.down_payment)}`);
    addText(`2.3 Balance to be paid in ${agreement.installment_schedule} installments`);
    addText(`2.4 Interest Rate: ${agreement.penalties_interest_rate}% per annum`);
    addText("2.5 Payment Schedule:");
    addText(`    Monthly Payment: ${formatCurrency(agreement.installment_schedule && agreement.agreed_amount ? agreement.agreed_amount / agreement.installment_schedule : 0)}`);
    addText("    Due Date: 1st day of each month");
    addText("2.6 Payment Method: Through approved banking channels or mobile money transfer");
    addSection("3. DUE DILIGENCE AND REPRESENTATIONS");
    addText("3.1 The Seller warrants:");
    addText("    a) They have legitimate title to the property");
    addText("    b) The property is free from encumbrances");
    addText("    c) All rates and land rents are fully paid");
    addText("3.2 The Buyer acknowledges:");
    addText("    a) They have inspected the property");
    addText("    b) They have verified the title documents");
    addText("    c) They have conducted necessary searches at the lands office");
    doc.save(`land-sale-agreement-${agreement.agreement_id}.pdf`);
  };
  const viewAgreementDetails = async (id: number) => {
    try {
      setError(null);
      const response = await fetch(`/api/agreements/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch agreement details (Status: ${response.status}): ${errorText}`);
      }
      const data: AgreementType = await response.json();
      if (!data || typeof data !== 'object' || !('agreement_id' in data)) {
        throw new Error('Invalid agreement data received');
      }
      setSelectedAgreement(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load agreement details');
    }
  };
  if (loading) {
    return <div className="flex items-center justify-center p-6">Loading agreements...</div>;
  }
  if (error) {
    return <div className="text-red-600 p-6">{error}</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Agreement Documents</h2>
          {latestId !== null && (
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md">
              <span className="font-medium">Latest Agreement ID: {latestId}</span>
            </div>
          )}
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <DocumentIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <label className="cursor-pointer">
            <span className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">Upload a document</span>
            <input type="file" className="hidden" onChange={handleFileSelect} accept=".pdf,.doc,.docx" />
          </label>
          <p className="mt-1 text-xs text-gray-500">PDF, DOC up to 10MB</p>
          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="mt-2 text-sm text-gray-600">{uploadProgress}% uploaded</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Agreements</h3>
        <div className="space-y-4">
          {agreements.map((agreement) => (
            <div key={agreement.agreement_id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center space-x-4">
                <DocumentIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800">Agreement #{agreement.agreement_id}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Amount: {formatCurrency(agreement.agreed_amount)}</p>
                    <p>Status: {agreement.buyer_agreed && agreement.seller_agreed ? 'Completed' : 'Pending'}</p>
                    <p>Created: {new Date(agreement.date_created).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => viewAgreementDetails(agreement.agreement_id)}
                  className="flex items-center space-x-2 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => generatePDF(agreement)}
                  className="flex items-center space-x-2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedAgreement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">Land Sale Agreement</h3>
            <div className="space-y-6">
              <div className="prose max-w-none">
                <h4 className="font-semibold text-lg">Agreement for Sale of Land</h4>
                <p>This agreement is made on {new Date(selectedAgreement.date_created).toLocaleDateString()} between:</p>
                <p><strong>Seller:</strong> {selectedAgreement.seller?.first_name || '[Seller First Name]'} {selectedAgreement.seller?.last_name || '[Seller Last Name]'}, an individual in Kenya</p>
                <p><strong>Buyer:</strong> {selectedAgreement.buyer?.first_name || '[Buyer First Name]'} {selectedAgreement.buyer?.last_name || '[Buyer Last Name]'}</p>
                <h4 className="font-semibold text-lg mt-6">Key Definitions</h4>
                <ul>
                  <li><strong>Completion Date:</strong> 90 days from agreement date</li>
                  <li><strong>Interest Rate:</strong> 10% above base rate (Barclays Bank/Standard Chartered)</li>
                  <li><strong>Property Location:</strong> {selectedAgreement.parcel_number?.latitude || '[Latitude]'}, {selectedAgreement.parcel_number?.longitude || '[Longitude]'}</li>
                  <li><strong>Purchase Price:</strong> {formatCurrency(selectedAgreement.agreed_amount)}</li>
11:39
                </ul>
                <h4 className="font-semibold text-lg mt-6">Financial Terms</h4>
                <ul>
                  <li><strong>Down Payment:</strong> {formatCurrency(selectedAgreement.down_payment)}</li>
                  <li><strong>Installment Schedule:</strong> {selectedAgreement.installment_schedule} payments</li>
                  <li><strong>Interest Rate:</strong> {selectedAgreement.penalties_interest_rate}%</li>
                  <li><strong>Total Amount Made:</strong> {formatCurrency(selectedAgreement.total_amount_made)}</li>
                  <li><strong>Remaining Amount:</strong> {formatCurrency(selectedAgreement.remaining_amount)}</li>
                </ul>
                <h4 className="font-semibold text-lg mt-6">Agreement Status</h4>
                <ul>
                  <li><strong>Buyer Agreed:</strong> {selectedAgreement.buyer_agreed ? 'Yes' : 'No'}</li>
                  <li><strong>Seller Agreed:</strong> {selectedAgreement.seller_agreed ? 'Yes' : 'No'}</li>
                </ul>
                <h4 className="font-semibold text-lg mt-6">Terms and Conditions</h4>
                <div className="whitespace-pre-wrap">{selectedAgreement.terms_and_conditions || 'Standard terms and conditions apply.'}</div>
                <h4 className="font-semibold text-lg mt-6">Blockchain Information</h4>
                <p className="break-all"><strong>Agreement Hash:</strong> {selectedAgreement.agreement_hash}</p>
                <p className="break-all"><strong>Previous Hash:</strong> {selectedAgreement.previous_hash || 'Initial agreement'}</p>
              </div>
              {selectedAgreement.transactions_history && selectedAgreement.transactions_history.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-4">Transaction History</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction #</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
                        </tr>
                      </thead>
  
                    </table>
                  </div>
                </div>
              )}
              <div className="mt-6 space-y-6">
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-lg mb-4">Witness Section</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Seller Witness</h5>
                      <div className="space-y-2">
                        <p className="border-b pb-2">Signature: _________________________</p>
                        <p className="border-b pb-2">Name: _________________________</p>
                        <p className="border-b pb-2">Occupation: _________________________</p>
                        <p className="border-b pb-2">Address: _________________________</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Buyer Witness</h5>
                      <div className="space-y-2">
                        <p className="border-b pb-2">Signature: _________________________</p>
                        <p className="border-b pb-2">Name: _________________________</p>
                        <p className="border-b pb-2">Occupation: _________________________</p>
                        <p className="border-b pb-2">Address: _________________________</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-6">
                <h4 className="font-semibold text-lg mt-6">Additional Information</h4>
                <div className="prose max-w-none">
                  <p><strong>Possession:</strong> The Property is sold with vacant possession, except for some outhouses that the Seller agrees to remove within 90 days of the Completion Date.</p>
                  <p><strong>Access Rights:</strong> The Seller agrees to give the Buyer access to the Property to plant trees.</p>
                  <p><strong>Early Possession:</strong> If the Buyer requires possession before the Completion Date, they must pay and release the full Purchase Price unconditionally to the Seller.</p>
                  <p><strong>Property Conditions:</strong> The Property is sold subject to any existing easements, rights of way, and the terms in the title.</p>
                  <p><strong>Disclaimer:</strong> The Buyer acknowledges that they have inspected the Property and are purchasing it in its current condition.</p>
                  <p><strong>Outgoings:</strong> All outgoings (expenses) related to the Property will be apportioned at the Completion Date.</p>
                  <p><strong>Law Society Conditions:</strong> The Law Society Conditions of Sale (1989 Edition) apply, except where varied by this agreement.</p>
                </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => generatePDF(selectedAgreement)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Download Agreement</span>
                </button>
                <button
                  onClick={() => setSelectedAgreement(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DocumentViewer;






