// "use client";

// import React, { useState, useEffect } from "react";
// import { getCookie, setCookie } from "cookies-next";
// import { AgreementFormData, Term, UserRole } from "@/app/utils/types";
// import { useSearchParams, useRouter } from "next/navigation";
// import ContractReviewPopup from "@/app/components/Contractreviewpop";
// import SellerSidebar from "@/app/(seller)/seller/components/Sellersidebar";

// const TermsAndConditions: React.FC = () => {
//   const [agreement, setAgreement] = useState<AgreementFormData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [checkedTerms, setCheckedTerms] = useState<Record<string, boolean>>({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [userRole, setUserRole] = useState<UserRole>(UserRole.EMPTY);
//   const [buyers, setBuyers] = useState<Record<string, string>>({});
//   const [sellers, setSellers] = useState<Record<string, string>>({});
//   const router = useRouter();

//   const searchParams = useSearchParams();
//   const parcelNumber = searchParams.get('parcel_number') || 'DEFAULT_VALUE';

//   useEffect(() => {
//     const existingRole = getCookie("userRole");
//     if (existingRole && ["buyer", "seller", "lawyer"].includes(existingRole)) {
//       setUserRole(existingRole as UserRole);
//     }
//     fetchAgreements(parcelNumber); 
//     fetchUsers();
//   }, [parcelNumber]);

//   const fetchAgreements = async (parcelNumber: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`/api/agreements?parcel_number=${parcelNumber}`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch agreements: ${response.status} ${response.statusText}`);
//       }
//       const data: AgreementFormData[] = await response.json();
//       if (!Array.isArray(data) || data.length === 0) {
//         throw new Error("No agreements found");
//       }

//       const mostRecentAgreement = data.sort((a, b) => b.agreement_id - a.agreement_id)[0];
//       setAgreement(mostRecentAgreement);

//       const initialCheckedTerms =
//         mostRecentAgreement.terms?.reduce((acc: Record<string, boolean>, term: Term) => {
//           if (term.id) {
//             acc[term.id] = false;
//           }
//           return acc;
//         }, {}) || {};

//       setCheckedTerms(initialCheckedTerms);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An unknown error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };



//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("/api/users");
//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }
//       const users = await response.json();
//       const buyerMap: Record<string, string> = {};
//       const sellerMap: Record<string, string> = {};
//       users.forEach((user: { role: string; id: string | number; first_name: string; last_name: string; }) => {
//         if (user.role === "buyer") {
//           buyerMap[user.id] = `${user.first_name} ${user.last_name}`;
//         }
//         if (user.role === "seller") {
//           sellerMap[user.id] = `${user.first_name} ${user.last_name}`;
//         }
//       });
//       setBuyers(buyerMap);
//       setSellers(sellerMap);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError("Failed to load users");
//     }
//   };

//   const handleTermCheck = (termId: string) => {
//     setCheckedTerms((prev) => ({
//       ...prev,
//       [termId]: !prev[termId],
//     }));
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleRoleSelection = (role: UserRole) => {
//     setCookie("userRole", role, { maxAge: 3600 });
//     setUserRole(role);
//     if (role === UserRole.BUYER || role === UserRole.SELLER) {
//       setShowPopup(true);
//     }
//   };

//   const handleSubmit = async (response: { buyer_agreed?: boolean; seller_agreed?: boolean; }) => {
//     if (!agreement) return;
//     try {
//       const updatedAgreement = { ...agreement, ...response };
//       const res = await fetch(`/api/agreements/${agreement.agreement_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedAgreement),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update agreement");
//       }
//       const result: AgreementFormData = await res.json();
//       setAgreement(result);
//       setShowPopup(false);
//       if (userRole === UserRole.BUYER && result.buyer_agreed) {
//         router.push("/buyer/buyer_agree");
//       } else if (userRole === UserRole.SELLER && result.seller_agreed) {
//         router.push("/seller/seller_agree");
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An unknown error occurred");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-4">
//         <p className="text-red-500 mb-4">{error}</p>
//         <button
//           onClick={() => fetchAgreements(parcelNumber)} 
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Retry Loading Agreement
//         </button>
//       </div>
//     );
//   }

//   if (!agreement) return <div className="text-center py-4">No agreement found.</div>;

//   const buyerName = agreement.buyer ? buyers[agreement.buyer] : "Unknown Buyer";
//   const sellerName = agreement.seller ? sellers[agreement.seller] : "Unknown Seller";

//   return (
//     <div className="flex">
//       <SellerSidebar />
//       <div className="p-4 max-w-3xl mx-auto flex-grow">
//         <h1 className="text-2xl font-bold mb-4 text-center">Terms And Conditions</h1>
//         <div className="mb-6 p-6 border rounded gap-x-10">
//           <h2 className="text-lg font-semibold">Agreement Details</h2>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Buyer Name:</strong> {buyerName}</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Seller Name:</strong> {sellerName}</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Parcel Number:</strong> {agreement.parcel_number || parcelNumber}</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Date Created:</strong> {new Date(agreement.date_created).toLocaleDateString()}</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Contract Duration:</strong> {agreement.contract_duration} months</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Agreed Amount:</strong> Ksh {agreement.agreed_amount}</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Installment Schedule:</strong> {agreement.installment_schedule} months</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Penalties Interest Rate:</strong> {agreement.penalties_interest_rate}%</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Down Payment:</strong> Ksh {agreement.down_payment}</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Remaining Amount:</strong> Ksh {agreement.remaining_amount}</p>
//           </div>
//           <div className="flex justify-between items-center my-4 bg-lightGreen shadow p-4 rounded">
//             <p className="flex-1 text-white"><strong>Total Amount Made:</strong> Ksh {agreement.total_amount_made || 0}</p>
//           </div>
//         </div>

//         {agreement.terms && agreement.terms.map((term: Term) => (
//           <div key={term.id} className="mb-4 p-4 border rounded shadow bg-green-50 flex justify-between items-center">
//             <div className="flex-1"><span>{term.text}</span></div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={term.id ? checkedTerms[String(term.id)] || false : false}
//                 onChange={() => {
//                   if (term.id !== undefined) {
//                     handleTermCheck(String(term.id));
//                   }
//                 }}
//                 className="form-checkbox h-5 w-5 text-green-600"
//               />
//             </div>
//           </div>
//         ))}
        
//         {(!getCookie("userRole") || getCookie("userRole") === "seller") && (
//           <button
//             onClick={() => handleRoleSelection(UserRole.SELLER)}
//             className="mt-1 w-full bg-foreground text-white p-2 rounded border-2 border-transparent hover:bg-white hover:text-foreground hover:border-foreground"
//           >
//             Agree to Terms as Seller
//           </button>
//         )}

//         {showPopup && agreement && (
//           <ContractReviewPopup
//             onClose={handleClosePopup}
//             onSubmit={handleSubmit}
//             agreement={agreement}
//             userRole={userRole}
//             onAgreementUpdate={() => fetchAgreements(parcelNumber)} 
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TermsAndConditions;
