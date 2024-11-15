// 'use client'

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { getCookie } from 'cookies-next';
// import { AgreementFormData, UserRole } from '@/app/utils/types';
// import LawyerSidebar from '../LawyerSidebar';
// // import { AgreementFormData, UserRole } from '@/app/utils/types';
// // import LawyerSidebar from '../components/LawyerSidebar';
// // import LawyerSidebar from '../LawyerSidebar';
// // import LawyerSidebar from '../components/LawyerSidebar';

// const LawyerAgreementNext: React.FC = () => {
//   const [agreements, setAgreements] = useState<AgreementFormData[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const userRole = getCookie('userRole');
//     if (userRole !== UserRole.LAWYER) {
//       router.push('/lawyer/agreementsnext');
//       return;
//     }

//     const fetchAgreements = async () => {
//       // Fetch all agreements for the lawyer to review
//       // You'll need to implement this API endpoint
//       const response = await fetch('/api/lawyer/agreements');
//       if (response.ok) {
//         const data = await response.json();
//         setAgreements(data);
//       }
//     };

//     fetchAgreements();
//   }, [router]);

//   if (agreements.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex">
//       <LawyerSidebar />
//       <div className="flex-grow p-6">
//         <h1 className="text-2xl font-bold mb-4">Agreements to Review</h1>
//         {agreements.map((agreement) => (
//           <div key={agreement.agreement_id} className="mb-4 p-4 border rounded">
//             <p>Parcel Number: {agreement.parcel_number}</p>
//             <p>Agreed Amount: {agreement.agreed_amount}</p>
//             <p>Buyer Agreed: {agreement.buyer_agreed ? 'Yes' : 'No'}</p>
//             <p>Seller Agreed: {agreement.seller_agreed ? 'Yes' : 'No'}</p>
//             {/* Add more agreement details as needed */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LawyerAgreementNext;