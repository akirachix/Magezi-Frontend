// import React, { useState } from 'react';
// import { FileText as DocumentIcon, Download as DownloadIcon } from 'lucide-react';


// interface Document {
//   id: string;
//   name: string;
//   date: string;
//   url: string;
// }

// const DocumentViewer: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [documents] = useState<Document[]>([
//     {
//       id: '1',
//       name: 'Agreement_Document.pdf',
//       date: '2024-03-14',
//       url: '/documents/1'
//     },
//     {
//       id: '2',
//       name: 'Contract_Details.pdf',
//       date: '2024-03-14',
//       url: '/documents/2'
//     }
//   ]);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]);
//       // Simulated upload progress
//       let progress = 0;
//       const interval = setInterval(() => {
//         progress += 10;
//         setUploadProgress(progress);
//         if (progress >= 100) {
//           clearInterval(interval);
//           setTimeout(() => {
//             setUploadProgress(0);
//             setSelectedFile(null);
//           }, 1000);
//         }
//       }, 200);
//     }
//   };

//   const handleDownload = (url: string) => {
//     // Implement actual download logic here
//     console.log('Downloading document from:', url);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Agreement Documents</h2>
        
//         {/* Upload Section */}
//         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//           <DocumentIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//           <label className="cursor-pointer">
//             <span className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
//               Upload a document
//             </span>
//             <input
//               type="file"
//               className="hidden"
//               onChange={handleFileSelect}
//               accept=".pdf,.doc,.docx"
//             />
//           </label>
//           <p className="mt-1 text-xs text-gray-500">PDF, DOC up to 10MB</p>
          
//           {/* Upload Progress */}
//           {uploadProgress > 0 && (
//             <div className="mt-4">
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div 
//                   className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
//                   style={{ width: `${uploadProgress}%` }}
//                 />
//               </div>
//               <p className="mt-2 text-sm text-gray-600">{uploadProgress}% uploaded</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Documents List */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">Uploaded Documents</h3>
//         <div className="space-y-4">
//           {documents.map((doc) => (
//             <div 
//               key={doc.id}
//               className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150"
//             >
//               <div className="flex items-center space-x-4">
//                 <DocumentIcon className="h-6 w-6 text-gray-400" />
//                 <div>
//                   <p className="font-medium text-gray-800">{doc.name}</p>
//                   <p className="text-sm text-gray-500">{doc.date}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleDownload(doc.url)}
//                 className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <DownloadIcon className="h-4 w-4" />
//                 <span>Download</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentViewer;

import React, { useState, useEffect } from 'react';
import { FileText as DocumentIcon, Download as DownloadIcon, EyeIcon } from 'lucide-react';
import { AgreementFormData, AgreementType } from "@/app/utils/types";

const DocumentViewer = () => {
  const [agreements, setAgreements] = useState<AgreementType[]>([]);
  const [selectedAgreement, setSelectedAgreement] = useState<AgreementType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    try {
      const response = await fetch('/api/agreements/');
      if (!response.ok) throw new Error('Failed to fetch agreements');
      const data: AgreementType[] = await response.json();
      setAgreements(data);
    } catch (err) {
      setError('Failed to load agreements');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(0);
            fetchAgreements();
          }, 1000);
        }
      }, 200);
    }
  };

  const generatePDF = async (agreement: AgreementType) => {
    const content = `
      AGREEMENT DETAILS
      
      Agreement ID: ${agreement.agreement_id}
      Date: ${new Date().toLocaleDateString()}
      
      PARTIES INVOLVED
      
      Buyer: ${agreement.buyer || 'Not specified'}
      Seller: ${agreement.seller || 'Not specified'}
      Lawyer: ${agreement.lawyer || 'Not specified'}
      
      STATUS
      
      Buyer Agreed: ${agreement.buyer_agreed ? 'Yes' : 'No'}
      Seller Agreed: ${agreement.seller_agreed ? 'Yes' : 'No'}
      
      TERMS AND CONDITIONS
      
      ${agreement.terms || 'No specific terms provided'}
      
      SIGNATURES
      
      Buyer: ________________
      Date: ________________
      
      Seller: ________________
      Date: ________________
      
      Lawyer: ________________
      Date: ________________
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `agreement-${agreement.agreement_id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const viewAgreementDetails = async (id: number) => {
    try {
      const response = await fetch(`/api/agreements/${id}`);
      if (!response.ok) throw new Error('Failed to fetch agreement details');
      const data: AgreementType = await response.json();
      setSelectedAgreement(data);
    } catch (err) {
      setError('Failed to load agreement details');
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Agreement Documents</h2>
        
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <DocumentIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <label className="cursor-pointer">
            <span className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Upload a document
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx"
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">PDF, DOC up to 10MB</p>
          
          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">{uploadProgress}% uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* Agreements List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Agreements</h3>
        <div className="space-y-4">
          {agreements.map((agreement) => (
            <div 
              key={agreement.agreement_id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center space-x-4">
                <DocumentIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800">Agreement #{agreement.agreement_id}</p>
                  <p className="text-sm text-gray-500">
                    Status: {agreement.buyer_agreed && agreement.seller_agreed ? 'Completed' : 'Pending'}
                  </p>
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

      {/* Agreement Details Modal */}
      {selectedAgreement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold mb-4">Agreement Details</h3>
            <div className="space-y-4">
              <p><strong>Agreement ID:</strong> {selectedAgreement.agreement_id}</p>
              <p><strong>Buyer:</strong> {selectedAgreement.buyer || 'Not specified'}</p>
              <p><strong>Seller:</strong> {selectedAgreement.seller || 'Not specified'}</p>
              <p><strong>Lawyer:</strong> {selectedAgreement.lawyer || 'Not specified'}</p>
              <p><strong>Status:</strong> {selectedAgreement.buyer_agreed && selectedAgreement.seller_agreed ? 'Completed' : 'Pending'}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedAgreement(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => generatePDF(selectedAgreement)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;